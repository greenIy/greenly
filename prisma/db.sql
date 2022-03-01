# MYSQL DB DEFINITION. SHOULD ONLY BE USED TO CREATE PRISMA MODEL (SCHEME.PRISMA)
# Notes:
# - VARCHAR(255) for longer strings (e.g. addresses)
# - VARCHAR(50) for most other strings
# - UIDs will be auto-incremented for compact size-management and fast searches. Using INT UNSIGNED AUTO_INCREMENT.
# - References to UIDs use INT UNSIGNED NOT NULL. Can be changed further down the road for memory management purposes.
# - The way a Supply is identified and referenced can and may need to be changed later.
# -- Viable alternative: (supplier, id). warehouse or product don't really need to be in composite PK.

# OTHER TABLES
CREATE TABLE Address (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    address         VARCHAR(255)    NOT NULL,
    country         VARCHAR(50)     NOT NULL,
    city            VARCHAR(50)     NOT NULL,
    # Best way to store latitude and longitude is using MySQL POINT, but it is not supported by Prisma
    latitude        DECIMAL         NOT NULL,
    longitude       DECIMAL         NOT NULL,
    postal_code     VARCHAR(10)     NOT NULL
);

CREATE TABLE Category (
    id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(50) NOT NULL,
    parent_category     INT UNSIGNED,

    FOREIGN KEY (parent_category)
        REFERENCES Category(id)
        ON DELETE CASCADE
);

CREATE TABLE Product (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    description     VARCHAR(1000) NOT NULL,
    # Category can be null so that categories can be deleted without
    # product interference. Products should never be left without categories though.
    category        INT UNSIGNED,
    # Can eventually be changed, complement_name could be stored here
    # instead of necessarily linking to an existing product (e.g. what if
    # required product is deleted?)
    complement_name     VARCHAR(50),
    complement_amount   NUMERIC(2),

    FOREIGN KEY (category)
         REFERENCES Category(id)
);

# USER TABLES
# Administrator privileges could just be an attribute here
CREATE TABLE User (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    password    VARCHAR(60),# bcrypt hashes always use 60 characters
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    address     INT UNSIGNED NOT NULL,


    FOREIGN KEY (address)
        REFERENCES Address(id)

);

# Uncomment if user-differentiating attributes are ever found
# CREATE TABLE Consumer (
#
# );
#
# CREATE TABLE Supplier (
#
# );
#
# CREATE TABLE Transporter (
#
# );

# SUPPLIER-RELATED TABLES

CREATE TABLE Warehouse (
    id              INT UNSIGNED AUTO_INCREMENT,
    address         INT UNSIGNED NOT NULL,
    capacity        INT UNSIGNED NOT NULL,
    resource_usage  INT UNSIGNED NOT NULL,
    supplier     INT UNSIGNED NOT NULL,

    PRIMARY KEY (id, supplier), # Composite PK allows warehouse indexing per supplier. No use-case requires listing all known warehouses.

    FOREIGN KEY (address)
        REFERENCES Address(id),

    FOREIGN KEY (supplier)
        REFERENCES User(id)
        ON DELETE CASCADE

);

# TRANSPORTER-RELATED TABLES
CREATE TABLE Distribution_Center (
    id          INT UNSIGNED AUTO_INCREMENT,
    address     INT UNSIGNED NOT NULL,
    capacity    INT UNSIGNED NOT NULL,
    transporter INT UNSIGNED NOT NULL,

    PRIMARY KEY (id, transporter), # Composite PK allows dist. center indexing per transporter.

    FOREIGN KEY (address)
        REFERENCES Address(id),

    FOREIGN KEY (transporter)
         REFERENCES User(id)
         ON DELETE CASCADE

);

CREATE TABLE Vehicle (
    id                  INT UNSIGNED AUTO_INCREMENT,
    resource_usage      INT UNSIGNED NOT NULL,
    license_plate       VARCHAR(6) NOT NULL,
    average_emissions   INT UNSIGNED NOT NULL,
    fuel_type           ENUM('ELECTRICITY', 'DIESEL', 'PETROL') NOT NULL,
    payload_capacity    INT UNSIGNED NOT NULL,

    transporter         INT UNSIGNED NOT NULL,
    distribution_center INT UNSIGNED NOT NULL,

    PRIMARY KEY (id, transporter), # Composite PK allows vehicle indexing per transporter.

    FOREIGN KEY (transporter)
         REFERENCES User(id)
         ON DELETE CASCADE,

    FOREIGN KEY (distribution_center)
         REFERENCES Distribution_Center(id)
);

# CONSUMER, ORDER & SUPPLY RELATED TABLES
CREATE TABLE `Order` (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    consumer    INT UNSIGNED NOT NULL,
    date        DATE NOT NULL,

    FOREIGN KEY (consumer)
       REFERENCES User(id)

);

CREATE TABLE Supply (
    product         INT UNSIGNED NOT NULL,
    supplier        INT UNSIGNED NOT NULL,
    warehouse       INT UNSIGNED NOT NULL,
    quantity        INT UNSIGNED NOT NULL,
    price           INT UNSIGNED NOT NULL,
    production_date DATE NOT NULL,
    expiration_date DATE NOT NULL,


    PRIMARY KEY (product, supplier, warehouse), # Hypothetically, supplier could be removed from primary key. Makes searches easier.

    FOREIGN KEY (product)
        REFERENCES Product(id)
        ON DELETE CASCADE, # Suppliers can no longer supply a product which is not being sold

    FOREIGN KEY (supplier)
        REFERENCES User(id)
        ON DELETE CASCADE,

    FOREIGN KEY (warehouse)
        REFERENCES Warehouse(id)
);

CREATE TABLE Order_Item (
    # Represents Supply inside Order
    # This structure allows items from multiple suppliers and transporters to be within the same order. (e.g. AliExpress)

    id          INT UNSIGNED AUTO_INCREMENT,
    quantity    INT UNSIGNED NOT NULL,
    status      CHAR(1),
    `order`       INT UNSIGNED NOT NULL,

    product     INT UNSIGNED NOT NULL,
    supplier    INT UNSIGNED NOT NULL,
    warehouse   INT UNSIGNED NOT NULL,

    transporter INT UNSIGNED NOT NULL,
    vehicle     INT UNSIGNED NOT NULL,

    PRIMARY KEY (id, `order`), # Composite PK allows item indexing per order.

    FOREIGN KEY (`order`)
        REFERENCES `Order`(id),

    FOREIGN KEY (product, supplier, warehouse)
        REFERENCES Supply(product, supplier, warehouse),

    FOREIGN KEY (transporter, vehicle)
        REFERENCES Vehicle(transporter, id)
);

CREATE TABLE Supply_History (
    # Referencing Supply and using date as moment allows all history data
    # regarding the same supply to be kept in the same table.

    # Supply Identifiers
    product     INT UNSIGNED NOT NULL,
    supplier    INT UNSIGNED NOT NULL,
    warehouse   INT UNSIGNED NOT NULL,

    # Statement date
    moment      DATE NOT NULL,

    # Data to be stored (relative to statement date)
    quantity    INT UNSIGNED NOT NULL, # Per warehouse
    price       INT,

    PRIMARY KEY (product, supplier, warehouse, moment),

    FOREIGN KEY (product, supplier, warehouse)
        REFERENCES Supply(product, supplier, warehouse)
        ON DELETE CASCADE
);

CREATE TABLE Supply_Transporters (
    # Specified which transporters can serve which supplies

    # Supply Identifiers
    product     INT UNSIGNED NOT NULL,
    supplier    INT UNSIGNED NOT NULL,
    warehouse   INT UNSIGNED NOT NULL,

    # Transporter
    transporter INT UNSIGNED NOT NULL,

    PRIMARY KEY (product, supplier, warehouse, transporter),

    FOREIGN KEY (product, supplier, warehouse)
        REFERENCES Supply(product, supplier, warehouse)
        ON DELETE CASCADE,

    FOREIGN KEY (transporter)
        REFERENCES User(id)
        ON DELETE CASCADE

);
