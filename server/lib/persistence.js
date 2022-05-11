/*  Greenly Persistence Library
    Functions included pertain to database access and manipulation.
*/

const { PrismaClient } = require('@prisma/client');
const {Client} = require("@googlemaps/google-maps-services-js");
const bcrypt = require('bcrypt');
const argv = require('../server').argv

// Use 10 salt rounds for each hash
const saltRounds = 10;

// Round coordinates to 6 decimal places
const roundingPrecision = 6;

// Proper rounding function as oposed to JS Math
function roundCoordinates(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}


/* Persistence Init */

const prisma = new PrismaClient({
    // Log database operations if -m flag is present
    log: argv.m || argv.databaseMonitoring ? ['query', 'info', 'warn', 'error'] : []
});
const maps = new Client();

/* Checking database availability */

prisma.$connect().catch((reason) => {
    console.log("📶 Database connection failed.")
    process.exit(1)
})

/* Helper functions */

// Proper rounding function as oposed to JS Math
function roundCoordinates(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}   

// Server-side pagination
function manualPagination (array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}


function calcLowestPrice (supplies) {
    let min = Number.POSITIVE_INFINITY;
    supplies.forEach((supply) => {
        if (parseFloat(supply.price) < parseFloat(min)) {
            min = supply.price
        }
    })

    return min;
}; 

function calcHighestPrice (supplies) {
    let max = Number.NEGATIVE_INFINITY;
    supplies.forEach((supply) => {
        if (parseFloat(supply.price) > parseFloat(max)) {
            max = supply.price
        }
    })

    return max;
}; 


/* User Functions */

/* Returns user object on creation, or null if invalid */
async function createUser(params) {
    try {
        let newUser = await prisma.user.create({
            data: {
                first_name: params.first_name,
                last_name: params.last_name ? params.last_name : '',
                email: params.email,
                phone: params.phone,
                type: params.type
            }
        })


        let newCredentials = params.password ? await prisma.credentials.create({
            data: {
                id: newUser.id,
                provider: "local",
                value: bcrypt.hashSync(params.password, saltRounds)

            }
        }) : await prisma.credentials.create({
            data: {
                id: newUser.id,
                provider: params.provider,
                value: bcrypt.hashSync(params.sub, saltRounds)
            }
        })

        // Create a new company if the user is a transporter or a supplier
        if (["TRANSPORTER", "SUPPLIER"].includes(newUser.type)) {
            const newCompany = await prisma.company.create({
                data: {
                    name: params.company.name,
                    bio: params.company.bio,
                    email: params.company.email
                }
            })

            // Updating the user's company after we're sure user creation didn't go wrong.
            newUser = await prisma.user.update({
                where: {
                    id: newUser.id
                },
                data: {
                    company: newCompany.id
                }
            })
        }

        return {id: newUser.id};

    } catch (e) {
        console.log(e)
        return null;
    }
}

async function updateUser(id, params) {

    /* Updating only referenced parameters into database
       The point of this procedure is to understand which properties
       the user is attempting to change, and to change only those.
       The JSON payload format differs slightly from what Prisma.UserSelection accepts, so the differences have to be mapped
       using userKeyMap and addressKeyMap
    */

    const userKeyMap = {
        first_name: "first_name",
        last_name: "last_name",
        email: "email",
        phone: "phone",
        type: "type",
        new_password: "password"
    }

    const companyKeyMap = {
        name: "name",
        bio: "bio",
        email: "email"
    }

    const userDataSelection = {}


    // Mapping user data

    for (const [key, value] of Object.entries(params)) {
        if (key in userKeyMap) {
            if (key == "new_password") {
                userDataSelection[userKeyMap[key]] = bcrypt.hashSync(value, saltRounds)

            } else {
                userDataSelection[userKeyMap[key]] = value
            }
        }
    }

    // If the user is a transporter/supplier, allow them to edit company info

    if (params.hasOwnProperty("company")) {
        companyDataSelection = {}
        for (const [key, value] of Object.entries(params.company)) {
            if (key in companyKeyMap) {
                companyDataSelection[companyKeyMap[key]] = value
            }
        }
        userDataSelection.Company = {update: companyDataSelection}
    }

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: userDataSelection
        })

        return updatedUser;

    } catch (e) {
        console.log(e)
        return null;
    }

}

/* Returns true if deleted succesfully, false otherwise */
async function deleteUser(id) {
    try {
        /* TODO: Eventually also delete: 
                * All orders by user, in case of consumer
                * Company
                * All supplies being supplied by supplier
                * All transports by transporter
        */

        if (getUserByID(id)) {
            // Delete user and all his addresses
            const deletedUser = await prisma.user.delete({
                where: {
                    id: id
                },
                include: {
                    Address: true
                }
            })

            await prisma.address.deleteMany({
                where: {
                    user: id
                }
            })


            return true
        } else {
            return false
        }

    } catch (e) {
        console.log(e)
        return false;
    }

}

async function getAllUsers() {
    return users = await prisma.user.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            type: true,
        }
    });
}

async function getUserByID(id, withPassword=false) {
    try {
        return user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true,
                type: true,
                Credentials: withPassword ? {
                    select: {
                        provider: true,
                        value: true,
                    }
                } : withPassword,
                Address: {
                    select: {
                        id: true,
                        street: true,
                        city: true,
                        country: true,
                        postal_code: true,
                        nif: true,
                        latitude: true,
                        longitude: true,
                        is_shipping: true,
                        is_billing: true,
                    }
                },
                Company: {
                    select: {
                        id: true,
                        name: true,
                        bio: true,
                    }
                },
            }
        })
    } catch (e){
        console.log(e)
        return null;
    }
}

async function getUserByEmail(email, withPassword=false) {
    // TODO: Fix 'with password'
    try {
        return user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true,
                Credentials: withPassword ? {
                    select: {
                        provider: true,
                        value: true
                    }
                } : withPassword,
                type: true,
                Address: {
                    select: {
                        id: true,
                        street: true,
                        city: true,
                        country: true,
                        postal_code: true,
                        nif: true,
                        latitude: true,
                        longitude: true,
                        is_shipping: true,
                        is_billing: true,
                    }
                },
                Company: {
                    select: {
                        id: true,
                        name: true,
                        bio: true,
                    }
                },
            }
        })
    } catch (e){
        console.log(e)
        return null;
    }
}

async function checkUserConflict(attribute, value) {
    // Checks if a user attribute is already in use.
    // Should be used for email and phone
    // Returns boolean representing the existance of conflict.

    let result;

    try{
        if (attribute == "id") {
            result = await prisma.user.findUnique({
                'where': {
                    id: value
                }
            })
        } else if (attribute == "email") {
            result = await prisma.user.findUnique({
                'where': {
                    email: value
                }
            })
        }
    
        return result;
    } catch (e) {
        return null;
    }
}

/* Address Functions */

async function createAddress(userID,
                             street,
                             city,
                             country,
                             postal_code,
                             nif) {

    // Obtaining data from Google Geocoding API

    try {
        const geocoded = await maps.geocode({
            params: {
                address: `${street}, ${city}, ${country}`,
                key: process.env.GOOGLE_API_KEY
            }
        })

        lat = roundCoordinates(geocoded.data.results[0].geometry.location.lat, roundingPrecision);
        lng = roundCoordinates(geocoded.data.results[0].geometry.location.lng, roundingPrecision);
    } catch (e) {
        lat = 0;
        lng = 0;
    }

    try {
        let newAddress = await prisma.address.create({
            data: {
                user: userID,
                nif: nif,
                street: street,
                city: city,
                country: country,
                postal_code: postal_code,
                latitude: lat,
                longitude: lng
            }
        })

        return {id: newAddress.id}
    } catch (e) {
        console.log(e)
        return null;
    }
}

async function updateAddress(userId, addressId, params) {
    const addressKeyMap = {
        street: "street",
        city: "city",
        postal_code: "postal_code",
        country: "country",
        nif: "nif",
        is_shipping: "is_shipping",
        is_billing: "is_billing"
    }

    const addressDataSelection = {}

    // Map only selected address data

    for (const [key, value] of Object.entries(params)) {
        if (key in addressKeyMap) {
            addressDataSelection[addressKeyMap[key]] = value
        }
    }

    try {

        // Set all other user addresses to false if new address is  default billing or shipping

        if (addressDataSelection["is_shipping"]) {
            await prisma.address.updateMany({
                where: {
                    user: userId
                },
                data: {
                    is_shipping: false
                }
            })
        }
        if (addressDataSelection["is_billing"]) {
            await prisma.address.updateMany({
                where: {
                    user: userId
                },
                data: {
                    is_billing: false
                }
            })
        }

        let updatedAddress = await prisma.address.update({
            where: {
                id: addressId
            },
            data: addressDataSelection
        })

        // Now that all the information is up to date, we can re-calculate lat and lng, and reinsert

        let lat = 0;
        let lng = 0;

        try {
            const geocoded = await maps.geocode({
                params: {
                    address: `${updatedAddress.street}, ${updatedAddress.city}, ${updatedAddress.country}`,
                    key: process.env.GOOGLE_API_KEY
                }
            })
            lat = roundCoordinates(geocoded.data.results[0].geometry.location.lat, roundingPrecision);
            lng = roundCoordinates(geocoded.data.results[0].geometry.location.lng, roundingPrecision);

        } catch (e) {
            console.log(e)
        }

        updatedAddress = await prisma.address.update({
            where: {
                id: addressId
            },
            data: {
                latitude: lat,
                longitude: lng
            }
        })


        return updateAddress;
    } catch (e) {
        console.log(e)
        return null;
    }
}

async function deleteAddress(id) {
    try {
        await prisma.address.delete({
            where: {
                id: id
            }
        })

        return true;

    } catch (e) {
        // If it doesn't exist, prisma throws "RecordNotFound"
        console.log(e)
        return false
    }
}

/* Product Functions */

/**
 *
 * @param {Number} limit
 * @param {Number} page
 * @param {String} category
 * @param {String[]} keywords
 * @returns An object composed of the total number of pages for the included filters and an array of product objects.
 */
async function getAllProducts(limit = 50,
                              page = 1, 
                              category, 
                              keywords,
                              sort,
                              price_range) {

    // Helper functions
    const manualPagination = (array, page_size, page_number) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    const calcLowestPrice = (supplies) => {
        let min = Number.POSITIVE_INFINITY;
        supplies.forEach((supply) => {
            if (parseFloat(supply.price) < parseFloat(min)) {
                min = supply.price
            }
        })

        return min;
    };

    const calcHighestPrice = (supplies) => {
        let max = Number.NEGATIVE_INFINITY;
        supplies.forEach((supply) => {
            if (parseFloat(supply.price) > parseFloat(max)) {
                max = supply.price
            }
        })

        return max;
    };


    let filterSelection = {}

    let sortingMethod = {}

    /* Sorting */

    // If no sorting method was specified
    if (!sort) {
        sort = "newest"
    }

    switch (sort) {
        case "newest":
            sortingMethod.id = "desc"
            break;
        case "oldest":
            sortingMethod.id = "asc"
            break;
        case "name_asc":
            sortingMethod.name = "asc"
            break;
        case "name_desc":
            sortingMethod.name = "desc"
            break;
    }

    if (category) {
        // Initialize OR search between name, description and exact search for categories
        filterSelection.AND = []

        // Prisma doesn't support nested queries, this query is required to find all sub-categories of the mentioned category
        let subCategories = await prisma.$queryRaw`WITH RECURSIVE CTE (id, name, parent_id) AS (SELECT id, name, parent_category FROM Category WHERE parent_category = ${category} UNION ALL SELECT p.id, p.name, p.parent_category FROM Category p INNER JOIN CTE ON p.parent_category = CTE.id) SELECT * FROM CTE;`

        // Adding all subcategory IDs to search
        // This piece of code produces objects such as {OR:[category:x, category:y, ...]}, which allow us to obtain every product belonging to the requested
        // category and its subcategories
        filterSelection.AND.push({OR:[{category:category}, ...subCategories.map((subCategory) => ({category: subCategory.id}))]})
    }

    if (keywords) {
        // The following code searches the keywords on both name and description of the products

        // Initialize OR for exact search of parent and child categories
        filterSelection.OR = []

        // Initializing filter objects
        nameKeywords = {"name":{}}
        descriptionKeywords = {"description":{}}

        // According to Prisma Full-Search API and MySQL Full-Text Search
        if (Array.isArray(keywords)) {
            nameKeywords.name.search = descriptionKeywords.description.search = keywords.join("* ")
        } else {
            nameKeywords.name.search = descriptionKeywords.description.search = keywords + "*"
        }
        
        // Adding created filters to the filterSelection
        filterSelection.OR.push(nameKeywords, descriptionKeywords)
    }

    let products;

    if (["price_asc", "price_desc"].includes(sort)) {

        // Special price sorting against Prisma limitations
        // A Zeval banger -> day 1238987 of wishing JS had list comprehension.
        /* What follows is comparable to magic.
           Please do not ever ask what this does or how it was created.
           Ingredients include:
           * Cocaine
           * Adderall
           * Alcohol
           * Cocaine again
        */

        let sortedProductIDs;

        if (sort == "price_asc") {
            // Sort by absolute minimum
            sortedProductIDs = await prisma.supply.groupBy({
                by: ['product'],
                orderBy: {
                  _min: {
                    price: 'asc'
                  }
                }
              })
        } else if (sort == "price_desc") {
            // Sort by absolute maximum
            sortedProductIDs = await prisma.supply.groupBy({
                by: ['product'],
                orderBy: {
                  _max: {
                    price: 'desc'
                  }
                }
              })
        }

        products = await Promise.all(
            sortedProductIDs.map((currentProduct) => prisma.product.findMany({
                where: {id:currentProduct.product, ...filterSelection},

                select: {
                    id: true,
                    name: true,
                    description: true,
                    complement_name: true,
                    complement_amount: true,
                    Category: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    Supply: {
                        select: {
                            price: true
                        }
                    }
                } }))
            )

        // Unpack from findMany nested structure
        products = products.map((product) => product[0])

        // Remove bad results
        products = products.filter((product) => product != undefined)

    } else {
        // Get products based on provided filters
        products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                complement_name: true,
                complement_amount: true,
                Category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                Supply: {
                    select: {
                        price: true
                    }
                }
            },
            where: filterSelection,
            orderBy: sortingMethod
        });
    }

    // Filtering products based on selected supplier
    if (supplier) {

        // Checking what products the selected supplier sells
        let supplierProducts = await prisma.supply.groupBy({
            by: ['product'],
            where: {
                supplier: Number(supplier)
            },
        })
        
        // Cleaning data
        supplierProducts = supplierProducts.map((product) => product.product)

        // Filtering products
        products = products.filter((product) => supplierProducts.includes(product.id))
    }

    // Calculating and defining lowest and highest prices for each product
    products.forEach((product) => {
        if (product.Supply.length > 0) {
            product.lowest_price = parseFloat(calcLowestPrice(product.Supply).toFixed(2))
            product.highest_price = parseFloat(calcHighestPrice(product.Supply).toFixed(2))
        }
    })

    // Checking if price bounds have been set
    const minPrice = price_range.min || 0;
    const maxPrice = price_range.max || Number.POSITIVE_INFINITY;

    // Filtering products based on price
    products = products.filter((product) =>
        product.lowest_price > Number(minPrice) &&
        product.lowest_price < Number(maxPrice))

    // Get total product count
    let totalProducts = products.length

    // Manual Pagination
    products = manualPagination(products, limit, page)

    return {total_products: totalProducts, products}
}

async function getProductByID(id){
    try {
        let result =  product = await prisma.product.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                description: true,
                Category: {
                    select: {
                        id: true,
                        name: true
                    }
                } ,
                complement_name: true,
                complement_amount: true,
                ProductAttribute: {
                    select: {
                        id: true,
                        title: true,
                        content: true
                    }
                },
                Supply: {
                    select: {
                        User: {
                            select: {
                                Company: {
                                    select: {
                                        name: true
                                    }
                                },
                                id: true,
                                first_name: true,
                                last_name: true,
                            }
                        },
                        warehouse: true,
                        quantity: true,
                        price: true,
                        production_date: true,
                        expiration_date: true,
                        Supply_Transporter: {
                            select: {
                                User: { // Display company name if available
                                    select: {
                                        Company: {
                                            select: {
                                                name: true
                                            }
                                        },
                                        id: true,
                                        first_name: true,
                                        last_name: true,

                                    }
                                },
                                price: true,
                            }
                        },
                        Supply_History: {
                            select: {
                                moment: true,
                                quantity: true,
                                price: true
                            }
                        }
                    }
                }
                },
        })

        if (result) {
            for (let i = 0; i < result.Supply.length; i++) {
                // Gathering further warehouse info
                let warehouse = await prisma.warehouse.findUnique({
                    where: {
                        id_supplier: {id: result.Supply[i].warehouse, supplier: result.Supply[i].User.id},
                    },
                    select: {
                        id: true,
                        resource_usage: true,
                        renewable_resources: true
                    }
                })

                result.Supply[i].warehouse = warehouse

                // Gathering futher transport info
                for (let j = 0; j < result.Supply[i].Supply_Transporter.length; j++) {
                    // Gather average emissions based on all transporter vehicles
                    let vehicle_averages = await prisma.vehicle.aggregate({
                        where: {
                            transporter: result.Supply[i].Supply_Transporter[j].User.id
                        },
                        _avg: {
                            average_emissions: true,
                            resource_usage: true
                          },
                    })

                    // Adding vehicle averages to payload
                    result.Supply[i].Supply_Transporter[j].average_emissions = vehicle_averages._avg.average_emissions;
                    result.Supply[i].Supply_Transporter[j].average_resource_usage = vehicle_averages._avg.resource_usage;
                }
            }
        }


        return result;

    } catch (e){
        console.log(e)
        return null;
    }
}

/* Category Functions */

async function getAllCategories() {
    try {
        let categories = await prisma.category.findMany({orderBy: {name: 'asc'}})


        for (category of categories) {

            // Finding subcategories of current category
            let subCategories = await prisma.$queryRaw`WITH RECURSIVE CTE (id, name, parent_id) AS (SELECT id, name, parent_category FROM Category WHERE parent_category = ${category.id} UNION ALL SELECT p.id, p.name, p.parent_category FROM Category p INNER JOIN CTE ON p.parent_category = CTE.id) SELECT * FROM CTE;`

            // Counting products in each category
            let categorySelection = {OR:[{category:category.id}, ...subCategories.map((subCategory) => ({category: subCategory.id}))]}

            category.total_products = await prisma.product.count({
                    where: categorySelection
                    })
            }

        return categories

    } catch (e) {
        console.log(e)
        return null;
    }
}

async function createCategory(name, parent_category) {
    try {

        let newCategory = await prisma.category.create({
            data: {
                name: name,
                parent_category: parent_category
            }
        })

        return newCategory.id;
    } catch (e) {
        return null;
    }
}

async function updateCategory(id, params) {
    let categoryKeyMap = {
        "name": "name",
        "parent_category": "parent_category"
    }

    let categoryDataSelection = {}

    // Map all attributes to be changed
    for (const [key, value] of Object.entries(params)) {
        if (key in categoryKeyMap) {
            categoryDataSelection[categoryKeyMap[key]] = value
        }
    }

    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: id
            },
            data: categoryDataSelection
        })

        return updatedCategory
    } catch (e) {
        return null;
    }

}

async function deleteCategory(id) {
    try {
        await prisma.category.delete({
            where: {
                id: id
            }
        })

        return true;
    } catch (e) {
        // In case category can't be deleted
        if (e.code == "P2003") {
            return 409;
        }
        return false;
    }
}

/* Supplier Information Function */

async function getAllSuppliers() {
    try {
        let suppliers = await prisma.user.findMany({
            where: {
                type: "SUPPLIER"
            }, select: {
                id: true,
                first_name: true,
                last_name: true,
                Company: true,
                phone: true,
                email: true
            }
        })

        suppliers = await Promise.all(suppliers.map(async (supplier) => {

            // Cleaning data
            supplier.company = {
                name: supplier.Company.name,
                bio: supplier.Company.bio,
                email: supplier.Company.email
            }

            delete(supplier.Company)

            // Obtaining current product count (not including more than one supply for the same product)
            let productCount = await prisma.supply.groupBy({
                by: ['product'],
                where: {
                    supplier: supplier.id
                },
            })

            supplier.products_sold = productCount.length
            
            return supplier

        }))

        return suppliers

        // Obtaining amount of products currently available (i.e. supplies)

    } catch (e) {
        return null;
    }
}

/* Cart Functions */

async function getCart(userID) {
    try {

        // Obtaining current cart items, sorted by index
        let cartItems = await prisma.cart.findMany({
            where: {
                consumer: userID
            },
            select: {
                index: true,
                product: true,
                supplier: true,
                warehouse: true,
                transporter: true,
                quantity: true
            },
            orderBy: {
                index: 'asc'
            }
        })

        let totalPrice = 0;
        let totalSupplierResourceUsage = 0
        let totalSupplierRenewableResources = 0
        let totalTransporterResourceUsage = 0
        let totalTransporterEmissions = 0

        // Update each cart item with calculated properties: (shipping price and product price)
        cartItems = await Promise.all(cartItems.map(async (item) => {

            // Obtaining additional data regarding cart item
            let correspondingSupply = await prisma.supply.findUnique({
                where: {
                    product_supplier_warehouse: {
                        product: item.product, supplier: item.supplier, warehouse: item.warehouse 
                    }
                },
                select: {
                    price: true,
                    Supply_Transporter: {
                        where:  {
                            transporter: item.transporter
                        },
                        select: {
                            price: true,
                        }
                    }
                }
            })

            let supplier = await prisma.user.findUnique({
                where: {
                    id: item.supplier
                },
                include: {
                    Company: true
                }
            })

            let transporter = await prisma.user.findUnique({
                where: {
                    id: item.transporter
                },
                include: {
                    Company: true
                }
            })

            let warehouse = await prisma.warehouse.findUnique({
                where: {
                    id_supplier: {
                        id: item.warehouse,
                        supplier: item.supplier
                    }
                }
            })

            let product = await prisma.product.findUnique({
                where: {
                    id: item.product
                },
            })

            // Calculating transporter averages
            let vehicle_averages = await prisma.vehicle.aggregate({
                where: {
                    transporter: item.transporter
                },
                _avg: {
                    average_emissions: true,
                    resource_usage: true
                    },
            })

            // Updating cart item with additional information
            item.price = Number(correspondingSupply.price)
            item.transport_price = Number(correspondingSupply.Supply_Transporter[0].price)

            // Additional supplier info
            item.supplier = {
                id: item.supplier,
                name: supplier.Company ? supplier.Company.name : `${supplier.first_name} ${supplier.last_name}`
            }

            // Additional transporter info
            item.transporter = {
                id: item.transporter,
                name: transporter.Company ? transporter.Company.name : `${transporter.first_name} ${transporter.last_name}`
            }

            // Adding vehicle averages to payload
            item.average_transporter_emissions = parseFloat(vehicle_averages._avg.average_emissions.toFixed(2));
            item.average_transporter_resource_usage = parseFloat(vehicle_averages._avg.resource_usage.toFixed(2));

            // Adding warehouse averages to payload
            item.average_supplier_resource_usage = warehouse.resource_usage
            item.supplier_renewable_resouces = warehouse.renewable_resources

            // Additional product information
            // TODO: Eventually, also select the product's image here
            item.product = {
                id: item.product,
                name: product.name
            }

            // Incrementing the total cart price
            totalPrice += (item.price * item.quantity) + item.transport_price

            // Incrementing environmental details
            totalSupplierRenewableResources += item.supplier_renewable_resouces
            totalSupplierResourceUsage      += item.average_supplier_resource_usage
            totalTransporterResourceUsage   += item.average_transporter_resource_usage
            totalTransporterEmissions       += item.average_transporter_emissions

            return item
        }))

        // Weighing the renewable resources average
        totalSupplierRenewableResources = parseFloat((totalSupplierRenewableResources / cartItems.length).toFixed(2)) || 0

        return {
            items:                              cartItems, 
            total_price:                        totalPrice,
            total_supplier_renewable_resources: parseFloat(totalSupplierRenewableResources.toFixed(2)),
            total_supplier_resource_usage:      parseFloat(totalSupplierResourceUsage.toFixed(2)),
            total_transporter_resource_usage:   parseFloat(totalTransporterResourceUsage.toFixed(2)),
            total_transporter_emissions:        parseFloat(totalTransporterEmissions.toFixed(2))}

    } catch (e) {
        console.log(e)
        return null;
    }
}

async function addItemToCart(
    userId, 
    product, 
    supplier, 
    warehouse, 
    transporter, 
    quantity) {

    try {
        let correspondingSupply = await prisma.supply_Transporter.findUnique({
            where: {
                product_supplier_warehouse_transporter: {
                    product: product,
                    supplier: supplier,
                    warehouse: warehouse,
                    transporter: transporter,
                }
            },
            select: {
                Supply: true
            }
        })

        if (!correspondingSupply) {
            // In case the specified product/supplier/transporter combination isn't available
            return "INVALID_COMBINATION";
        }

        if (correspondingSupply.Supply.quantity < quantity) {
            // In case the user's order is larger than the available stock
            return "NO_STOCK";
        }

        try {
            let itemCount = await prisma.cart.count()

            await prisma.cart.create({
                data: {
                    index:          Number(itemCount) + 1,
                    consumer:       Number(userId),
                    product:        Number(product),
                    supplier:       Number(supplier),
                    warehouse:      Number(warehouse),
                    transporter:    Number(transporter),
                    quantity:       Number(quantity),
                }
            })
        } catch (e) {
            if (e.code == "P2002") {
                return "ALREADY_PRESENT"
            } else {
                return null;
            }
        }

        return "SUCCESSFULLY_ADDED"

    } catch (e) {
        console.log(e)
        return null;
    }
}

async function clearCart(userID) {
    try {
        await prisma.cart.deleteMany({
            where: {
                consumer: Number(userID)
            }
        })

        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function updateCartItem(userID, index, quantity) {
    try {

        let mentionedItem = await prisma.cart.findFirst({
            where: {
                index: Number(index),
                consumer: Number(userID)
            }
        })

        if (!mentionedItem) {
            return "INVALID_INDEX"
        }

        let correspondingSupply = await prisma.supply_Transporter.findUnique({
            where: {
                product_supplier_warehouse_transporter: {
                    product: mentionedItem.product,
                    supplier: mentionedItem.supplier,
                    warehouse: mentionedItem.warehouse,
                    transporter: mentionedItem.transporter,
                }
            },
            select: {
                Supply: true
            }
        })

        if (correspondingSupply.Supply.quantity < quantity) {
            // In case the user is trying to update the cart item to a quantity larger than available
            return "NO_STOCK";
        }

        // Updating quantity
        await prisma.cart.updateMany({
            where: {
                index: Number(index),
                consumer: Number(userID)
            }, data: {
                quantity: quantity
            }
        })

    } catch (e) {
        console.log(e)
        return null;
    }
}

async function removeCartItem(userID, index) {
    try {
        let mentionedItem = await prisma.cart.findFirst({
            where: {
                index: Number(index),
                consumer: Number(userID)
            }
        })

        if (!mentionedItem) {
            return "INVALID_INDEX"
        }

        // Removing specified cart item
        await prisma.cart.deleteMany({
            where: {
                index: Number(index),
                consumer: Number(userID) 
            }
        })

        // Updating all affected indexes
        await prisma.cart.updateMany({
            where: {
                consumer: Number(userID),
                index: {
                    gt: Number(index)
                }
            },
            data: {
                index: {
                    decrement: 1
                }
            }
        })


    } catch (e) {
        console.log(e)
        return null;
    }
}

/* Wishlist Functions */

async function getWishlist(userID) {
    try {

        let wishlistItems = await prisma.wishlist.findMany({
            where: {
                consumer: userID
            },
            select: {
                product: true
            },
            orderBy: {
                product: 'asc'
            }
        })

        // Gather additional data for each product
        // TODO: Eventually add product photo here too
        wishlistItems = await Promise.all(wishlistItems.map(async (item) => {
            let correspondingProduct = await prisma.product.findUnique({
                where: {
                    id: item.product
                }, select: {
                    name: true,
                    description: true,
                    Category: true,
                    Supply: true
                }
            })

            // Adding product information to wishlist item

            item = {
                id: item.product,
                name: correspondingProduct.name,
                description: correspondingProduct.description,
                category: {
                    id: correspondingProduct.Category.id,
                    name: correspondingProduct.Category.name
                },
                lowest_price: parseFloat(calcLowestPrice(correspondingProduct.Supply).toFixed(2))
            }

            return item
        }))

        return wishlistItems

    } catch (e) {
        return null;
    }
}

async function addProductToWishlist(userID, productID) {
    try {
        
        // Checking if product exists

        let mentionedProduct = await prisma.product.findUnique({
            where: {
                id: productID
            }
        })

        if (!mentionedProduct) {
            return "INVALID_PRODUCT"
        }

        await prisma.wishlist.create({
            data: {
                consumer: userID,
                product: productID
            }
        })

        return "SUCCESSFULLY_ADDED";

    } catch (e) {
        if (e.code == "P2002") {
            return "ALREADY_PRESENT";
        } else {
            return null;
        }
    }
}

async function clearWishlist(userID) {
    try {
        await prisma.wishlist.deleteMany({
            where: {
                consumer: Number(userID)
            }
        })
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function removeProductFromWishlist(userID, productID) {
    try {
        
        // Checking if product is in wishlist

        let mentionedProductInWishlist = await prisma.wishlist.findUnique({
            where: {
                consumer_product: {
                    consumer: Number(userID),
                    product: Number(productID)
                }
            }
        })

        if (!mentionedProductInWishlist) {
            return "NOT_PRESENT"
        }

        await prisma.wishlist.delete({
            where: {
                consumer_product: {
                    consumer: Number(userID),
                    product: Number(productID)
                }
            }
        })

        return "SUCCESSFULLY_DELETED"

    } catch (e) {
        return null;
    }
}

/* All functions to be made available to the rest of the project should be listed here */

module.exports = {
    // User Functions
    createUser,
    updateUser,
    deleteUser,
    getUserByID,
    getUserByEmail,
    getAllUsers,
    checkUserConflict,

    // Address Functions
    createAddress,
    updateAddress,
    deleteAddress,

    // Product Functions
    getAllProducts,
    getProductByID,

    // Category Functions
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,

    // Supplier Information Functions
    getAllSuppliers,

    // Cart Functions
    getCart,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    clearCart,

    // Wishlist Functions
    getWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    clearWishlist
}