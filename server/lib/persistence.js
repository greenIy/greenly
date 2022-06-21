/*  Greenly Persistence Library
    Functions included pertain to database access and manipulation.
*/

const { PrismaClient, Prisma } = require('@prisma/client');
const {Client} = require("@googlemaps/google-maps-services-js");
const bcrypt = require('bcrypt');
const argv = require('../server').argv

// Use 10 salt rounds for each hash
const saltRounds = 10;

// Round coordinates to 6 decimal places
const roundingPrecision = 6;

/* Persistence Init */

const prisma = new PrismaClient({
    // Log database operations if -m flag is present
    log: argv.m || argv.databaseMonitoring ? ['query', 'info', 'warn', 'error'] : []
});

Prisma.Decimal.prototype.toJSON = function() {
    return this.toNumber();
}

const maps = new Client();

/* Checking database availability */

prisma.$connect().catch((reason) => {
    console.log("📶 Database connection failed.")
    process.exit(1)
})

/* Helper functions */

// Proper rounding function as oposed to JS Math
function round(value, decimals) {
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

/**
 * Determining distribution center closest to destination and the best vehicle for delivery.
 * Currently decides the optimal vehicle based on distance from center to destination and 
 * current load of orders (i.e. which one currently has the least amount of orders in AWAITING_TRANSPORT mode?)
 * @param {*} transporter 
 * @param {*} destination 
 */
async function determineOptimalVehicle(transporter, destination) {
    try {

        /* Determining the closest distribution center */

        let userAddress = await prisma.address.findUnique({
            where: {
                id: destination
            }
        })

        // Considering only distribution centers with at least one vehicle

        let distributionCenters = await prisma.distribution_Center.findMany({
            where: {
                transporter: transporter.id,
                Vehicle: {
                    some: {
                        transporter: transporter.id
                    }
                }
            },
            select: {
                id: true,
                Address: {
                    select: {
                        id: true,
                        latitude: true,
                        longitude: true
                    }
                }
            }
        })

        // Figuring out which warehouse is closest to the destination address

        let origins = distributionCenters.map((center) =>  ({
            lat: parseFloat(center.Address.latitude), 
            lng: parseFloat(center.Address.longitude)}))
        
        let distances = await maps.distancematrix({
            params: {
                origins: origins,
                destinations: [
                    {
                        lat: userAddress.latitude,
                        lng: userAddress.longitude
                    }
                ],
                key: process.env.GOOGLE_API_KEY
            }
        })

        // If anything goes wrong, simply use the first vehicle
        if (distances.status != 200) {
            return 1
        }

        // Parsing the distances obtained from Google Distance Matrix

        let parsedDistances = distances.data.rows.map((row) => {
            let distance = row.elements[0].distance
            if (distance != null) {        
                return distance.value
            }
        }).filter((distance) => (distance != undefined))

        // Determining which warehouse is closest
        // This is index-safe since there are n distribution centers and n distance results

        let closestDistributionCenter = distributionCenters[parsedDistances.indexOf(Math.min(...parsedDistances))]

        /* Determining least-busy vehicle */

        let vehicles = await prisma.vehicle.findMany({
            where: {
                transporter: transporter.id,
                distribution_center: closestDistributionCenter.id
            },
            select: {
                id: true
            }
        })

        /**
         * This bit of code:
         * Gets the count of orders AWAITING_TRANSPORT for each vehicle in the warehouse;
         * Determines which vehicle is least busy, i.e. which one has the least amount of orders awaiting transport.
         */
        let leastBusyVehicle = vehicles[Math.min(...await Promise.all(
            vehicles.map(async (vehicle) => {
                return await prisma.order_Item.count({
                    where: {
                        status: "AWAITING_TRANSPORT",
                        transporter: transporter.id,
                        vehicle: vehicle.id
                    }
                })
            })
        ))]
            
        return leastBusyVehicle.id

    } catch (e) {
        console.log(e)
        // If anything goes wrong, simply use the first vehicle
        return 1
    }

}


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
                userDataSelection.Credentials = {
                    update: {
                        value: bcrypt.hashSync(value, saltRounds)
                    }
                }

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

        // TODO: PROOF FOR SOFT-DELETE

        if (getUserByID(id)) {

            await prisma.address.deleteMany({
                where: {
                    user: id
                }
            })

            await prisma.credentials.delete({
                where: {
                    id: id
                }
            })

            // Delete user and all his addresses
            const deletedUser = await prisma.user.delete({
                where: {
                    id: id
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
                Credentials: {
                    select: {
                        provider: true,
                        value: withPassword,
                    }
                },
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
                        email: true
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

        lat = round(geocoded.data.results[0].geometry.location.lat, roundingPrecision);
        lng = round(geocoded.data.results[0].geometry.location.lng, roundingPrecision);
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
            lat = round(geocoded.data.results[0].geometry.location.lat, roundingPrecision);
            lng = round(geocoded.data.results[0].geometry.location.lng, roundingPrecision);

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

    // TODO: PROOF FOR SOFT-DELETE


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
                              price_range,
                              supplier) {


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

/* Supplier Information Function */

async function getAllTransporters() {
    try {
        let transporters = await prisma.user.findMany({
            where: {
                type: "TRANSPORTER"
            }, select: {
                id: true,
                first_name: true,
                last_name: true,
                Company: true,
                phone: true,
                email: true
            }
        })

        transporters = await Promise.all(transporters.map(async (transporter) => {

            // Cleaning data
            transporter.company = {
                name: transporter.Company.name,
                bio: transporter.Company.bio,
                email: transporter.Company.email
            }

            delete(transporter.Company)

            // Obtaining current product count (not including more than one supply for the same product)
            let productCount = await prisma.supply.groupBy({
                by: ['product'],
                where: {
                    transporter: transporter.id
                },
            })

            transporter.products_currently_transported = productCount.length
            
            return transporter

        }))

        return transporters

        // Obtaining amount of products currently available (i.e. supplies)

    } catch (e) {
        return null;
    }
}

/* Cart Functions */

async function getCart(userID) {
    try {
        // TODO: Check if cart-items are still valid, check if the corresponding supply stock is still larger than the order quantity, remove them from the cart if they've become out of stock


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
            item.average_transporter_emissions = Number(vehicle_averages._avg.average_emissions);
            item.average_transporter_resource_usage = Number(vehicle_averages._avg.resource_usage);

            // Adding warehouse averages to payload
            item.average_supplier_resource_usage = Number(warehouse.resource_usage)
            item.supplier_renewable_resources = warehouse.renewable_resources

            // Additional product information
            // TODO: Eventually, also select the product's image here
            item.product = {
                id: item.product,
                name: product.name
            }

            // Incrementing the total cart price
            totalPrice += (item.price * item.quantity) + item.transport_price

            // Incrementing environmental details
            totalSupplierRenewableResources += item.supplier_renewable_resources
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

            let alreadyPresentCartItem = await prisma.cart.findUnique({
                where: {
                    consumer_product_supplier_warehouse_transporter: {
                        consumer:       Number(userId),
                        product:        Number(product),
                        supplier:       Number(supplier),
                        warehouse:      Number(warehouse),
                        transporter:    Number(transporter)
                    }
                }
            })

            if (alreadyPresentCartItem) {
                if (correspondingSupply.Supply.quantity < alreadyPresentCartItem.quantity + quantity) {
                    // In case the user's order is larger than the available stock
                    return "NO_STOCK";
                }

                // Update the current cartItem's quantity

                await prisma.cart.update({
                    where: {
                        consumer_product_supplier_warehouse_transporter: {
                            consumer:       Number(userId),
                            product:        Number(product),
                            supplier:       Number(supplier),
                            warehouse:      Number(warehouse),
                            transporter:    Number(transporter)
                        }
                    }, data: {
                        quantity: alreadyPresentCartItem.quantity + quantity
                    }
                })


            } else {
                let itemCount = await prisma.cart.count({
                    where: {
                        consumer: Number(userId)
                    }
                })
    
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
            }

        } catch (e) {
            return null;
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

/* Order Functions */
/**
 * This function is meant to be used by user-types with access to
 * order-management features (i.e. all except consumers).
 * Consumers will only receive their orders.
 * Suppliers will only receive orders with OrderItems in which they're registered as supplier.
 * Transporters will only receive orders with OrderItems in which they're registed as transporter.
 * Administrators will receive every order.
 * @param user - The user in question 
 */
 async function getOrdersByUser(user) {
    try {
        let orders;

        switch (user.type) {
            case "CONSUMER": {
                orders = await prisma.order.findMany({
                    where: {
                        consumer: user.id
                    },
                    include: {
                        Order_Item: true
                    },
                    orderBy: {
                        date: 'desc'
                    }
                })

                break;
            }
            case "SUPPLIER": {

                // Suppliers should get every order related to them except the ones which haven't been paid for

                orders = await prisma.order.findMany({
                    where: {
                        Order_Item: {
                            some: {
                                supplier: user.id,
                                NOT: {
                                    status: "AWAITING_PAYMENT"
                                }
                            }
                        }
                    },
                    include: {
                        Order_Item: {
                            where: {
                                supplier: user.id,
                                NOT: {
                                    status: "AWAITING_PAYMENT"
                                }
                            }
                        }
                    },
                    orderBy: {
                        date: 'desc'
                    }
                })

                orders

                break;
            }

            case "TRANSPORTER": {

                // Transporters should get every order related to them except the ones which haven't been paid for
                orders = await prisma.order.findMany({
                    where: {
                        Order_Item: {
                            some: {
                                transporter: user.id,
                                NOT: {
                                    status: "AWAITING_PAYMENT"
                                }
                            }
                        }
                    },
                    include: {
                        Order_Item: {
                            where: {
                                transporter: user.id,
                                NOT: {
                                    status: "AWAITING_PAYMENT"
                                }
                            }
                        }
                    },
                    orderBy: {
                        date: 'desc'
                    }
                })
                break;
            }

            case "ADMINISTRATOR": {
                orders = await prisma.order.findMany({
                    orderBy: {
                        date: 'desc'
                    }
                })

                break;
            }
        }

        // Cleaning data

        orders = await Promise.all(orders.map(async (order) => {            
            // Cleaning data

            let consumer = await prisma.user.findUnique({
                where: {
                    id: order.consumer
                }, select: {
                    id: true,
                    first_name: true,
                    email: true,
                    phone: true
                }
            })
            let shippingAddress = await prisma.address.findUnique({
                where: {
                    id: order.shipping_address
                },
                select: {
                    street: true,
                    country: true,
                    city: true,
                    latitude: true,
                    longitude: true,
                    postal_code: true
                }
            })
        
            let billingAddress = await prisma.address.findUnique({
                where: {
                    id: order.billing_address
                },
                select: {
                    street: true,
                    country: true,
                    city: true,
                    latitude: true,
                    longitude: true,
                    postal_code: true,
                    nif: true
                }
            })
        
            // Cleaning 
                
            order.shipping_address = shippingAddress
        
            order.billing_address = billingAddress

            order.consumer = consumer

            order.items = order.Order_Item

            delete order.Order_Item

            order.items = await Promise.all(order.items.map(async (item) => {
                item.product = await prisma.product.findUnique({
                    where: {
                        id: item.product
                    },
                    select: {
                        id: true,
                        name: true,
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

                return item
            }))

            return order
        }))

        return orders


    } catch (e) {
        console.log(e)
        return null;
    }
}

async function createOrder(userID, shippingAddressID, billingAddressID, observations) {
    try {
        
        // Check if user is using a valid address

        let mentionedUser = await getUserByID(userID)

        let userAddressIDs = mentionedUser.Address.map((addressObject) => addressObject.id)            

        if (!userAddressIDs.includes(Number(shippingAddressID))) {
            return "INVALID_SHIPPING_ADDRESS";
        }

        if (!userAddressIDs.includes(Number(billingAddressID))) {
            return "INVALID_BILLING_ADDRESS";
        }

        // Converting cartItems into order
        let cartItems = (await getCart(userID)).items

        // Checking if cart has items
        if (cartItems.length == 0) {
            return "EMPTY_CART"
        }
        // Checking if cart-items are still valid, if the corresponding supply stock is still larger than the order quantity

        let stockInvalid = await Promise.all(cartItems.map(async (item) => {
            let correspondingSupply = await prisma.supply_Transporter.findUnique({
                where: {
                    product_supplier_warehouse_transporter: {
                        product: item.product.id,
                        supplier: item.supplier.id,
                        warehouse: item.warehouse,
                        transporter: item.transporter.id,
                    }
                },
                select: {
                    Supply: true
                }
            })

            // In case the user's order is larger than the available stock
            return Number(correspondingSupply.Supply.quantity) < Number(item.quantity)
        }))

        if (stockInvalid.some((value) => value == true)) {
            return "NO_STOCK"
        }
    
        // Creating order
        let newOrder = await prisma.order.create({
            data: {
                consumer: userID,
                shipping_address: shippingAddressID,
                billing_address: billingAddressID,
                observations: observations,
                date: new Date()
            }
        })

        // Creating OrderItems from cartItems

        await Promise.all(cartItems.map(async (item, index) => {

            // Determine closest distribution center, and which vehicle to use

            let vehicle = await determineOptimalVehicle(item.transporter, shippingAddressID) || 1

            let newOrderItem = await prisma.order_Item.create({
                data: {
                    id: index + 1,
                    order: newOrder.id,
                    product: item.product.id,
                    supplier: item.supplier.id,
                    transporter: item.transporter.id,
                    warehouse: item.warehouse,
                    vehicle: vehicle,
                    quantity: item.quantity,
                    status: 'AWAITING_PAYMENT',
                    supply_price: item.price,
                    transport_price: item.transport_price,
                    supplier_resource_usage: item.average_supplier_resource_usage,
                    supplier_renewable_resources: item.supplier_renewable_resources,
                    transporter_resource_usage: item.average_transporter_resource_usage,
                    transporter_emissions: item.average_transporter_emissions,
                    arrival_date: null
                }
            })
        }))

        // Clearing the cart
        await clearCart(userID)

        return newOrder.id

    } catch (e) {
        console.log(e)
        return null;
    }
}

async function getOrderByID(id) {
    let order = await prisma.order.findUnique({
        where: {
            id: id
        },
        select: {
            consumer: true,
            date: true,
            shipping_address: true,
            observations: true,
            Order_Item: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    })

    if (order) {

        order.items = order.Order_Item
        delete order.Order_Item
    
        return order
    }

    return null
}

/** This function works dynamically, returning only the information
 *  a user should be able to see regarding a specific order,
 *  similarly to getUserOrders */
async function getFilteredOrderByID(user, orderID) {

    let order;

    switch (user.type) {
        // A consumer should view the entire order
        case "CONSUMER": {
            order = await prisma.order.findUnique({
                where: {
                    id: orderID
                },
                include: {
                    Order_Item: true
                },
            })

            break;
        }
        case "SUPPLIER": {
            // A supplier should only be able to view orderItems which pertain to himself
            order = await prisma.order.findUnique({
                where: {
                    id: orderID
                },
                include: {
                    Order_Item: {
                        where: {
                            supplier: user.id,
                            NOT: {
                                status: "AWAITING_PAYMENT"
                            }
                        }
                    }
                }
            })

            break;
        }

        case "TRANSPORTER": {
            // A transporter should only be able to view orderItems which pertain to himself

            order = await prisma.order.findUnique({
                where: {
                    id: orderID
                },
                include: {
                    Order_Item: {
                        where: {
                            transporter: user.id,
                            NOT: {
                                status: "AWAITING_PAYMENT"
                            }
                        }
                    }
                }
            })
            break;
        }

        case "ADMINISTRATOR": {
            // An administrator should be able to view the entire order
            order = await prisma.order.findUnique({
                where: {
                    id: orderID
                }
            })

            break;
        }
    }



    // Cleaning and adding data

    let consumer = await prisma.user.findUnique({
        where: {
            id: order.consumer
        }, select: {
            id: true,
            first_name: true,
            email: true,
            phone: true
        }
    })

    let shippingAddress = await prisma.address.findUnique({
        where: {
            id: order.shipping_address
        },
        select: {
            street: true,
            country: true,
            city: true,
            latitude: true,
            longitude: true,
            postal_code: true
        }
    })

    let billingAddress = await prisma.address.findUnique({
        where: {
            id: order.billing_address
        },
        select: {
            street: true,
            country: true,
            city: true,
            latitude: true,
            longitude: true,
            postal_code: true,
            nif: true
        }
    })

    // Cleaning 

    order.consumer = consumer

    order.shipping_address = shippingAddress

    order.billing_address = billingAddress

    order.items = await Promise.all(order.Order_Item.map(async (item) => {
        // Additional information

        let product = await prisma.product.findUnique({
            where: {
                id: item.product
            },
            select: {
                id: true,
                name: true,
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
            },
            include: {
                Address: {
                    select: {
                        street: true,
                        country: true,
                        city: true,
                        latitude: true,
                        longitude: true,
                        postal_code: true
                    }
                }
            }
        })

        let vehicle = await prisma.vehicle.findUnique({
            where: {
                id_transporter: {
                    id: item.vehicle,
                    transporter: item.transporter
                }
            },
            select: {
                id: true,
                license_plate: true,
                resource_usage: true,
                average_emissions: true,
                fuel_type: true,
                payload_capacity: true,
                distribution_center: true
            }
        })

        let notifications = await prisma.notification.findMany({
            where: {
                order: order.id
            }
        })

        // Deducing states from notification list
        let stateMap = notifications.map((notification) => {
            return {
                state: notification.scope, 
                timestamp: notification.timestamp
            }
        })

        // Filtering unique states

        stateMap.filter((value, index, self) => {
            return self.findIndex((element) => element.state == value.state) == index
        })

        // Adding CREATED state
        stateMap.push({scope:"CREATED", timestamp: order.date})

        item.product = product

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

        item.warehouse = {
            id: item.warehouse,
            address: warehouse.Address
        }

        item.vehicle = vehicle

        item.progress = stateMap

        return item
    }))

    delete order.Order_Item

    return order
}

// This function is used upon payment to change every order item status from "AWAITING_PAYMENT" to "PROCESSING"
async function changeOrderStatus(orderID, targetStatus) {

    let order = await getOrderByID(orderID)

    await Promise.all(order.items.map(async (item) => {
        let itemUpdate = await prisma.order_Item.update({
            where: {
                id_order: {
                    id: item.id,
                    order: orderID
                }
            },
            data: {
                status: targetStatus
            }
        })

        let productInfo = await prisma.product.findUnique({
            where: {
                id: item.product
            },
            select: {
                name: true
            }
        })

        await createNotification(item.supplier, 
            "Nova encomenda a processar!",
            `O item #${item.id} (${productInfo.name} x ${item.quantity} un.), da encomenda #${orderID} precisa de ser processado!`,
            "PROCESSING",
            orderID,
            item.id
        );

        return itemUpdate
    }))

    createNotification(order.consumer, 
        "Encomenda em processamento!",
        `A sua encomenda #${orderID} está agora a ser preparada, em breve estará nas suas mãos!`,
        "PROCESSING",
        orderID,
        1
    );
}

// Used to decrement the stock of many supplies when an order enters "PROCESSING" status
async function decrementSupplyStock(orderId) {
    let order = await getOrderByID(orderId)

    // Iterating through items in order to decrease stock
    await Promise.all(order.items.map(async (orderItem) => {

        // TODO: PROOF FOR STOCK RUPTURE
        // Decrementing corresponding supply's stock by the ordered amount
        let correspondingSupply = await prisma.supply.findUnique({
            where: {
                product_supplier_warehouse: {
                    product: orderItem.product,
                    supplier: orderItem.supplier,
                    warehouse: orderItem.warehouse
                }
            }
        })

        if (correspondingSupply.quantity - orderItem.quantity < 0) {
            await prisma.supply.update({
                where: {
                    product: orderItem.product,
                    supplier: orderItem.supplier,
                    warehouse: orderItem.warehouse
                },
                data: {
                    quantity: 0
                }
            })
        } else {
            await prisma.supply.update({
                where: {
                    product_supplier_warehouse: {
                        product: orderItem.product,
                        supplier: orderItem.supplier,
                        warehouse: orderItem.warehouse
                    }
                },
                data: {
                    quantity: {
                        decrement: orderItem.quantity
                    }
                }
            })
        }

        return correspondingSupply
    }))
}


async function updateOrderItem(user, orderID, itemID, targetStatus) {

    // Obtaining specified order and orderItem
    let order = await getOrderByID(orderID);

    let orderItem = order.items[order.items.findIndex((item) => item.id == itemID)]

    /* Checking preliminary conditions */

    if (!orderItem) {
        return "ITEM_NOT_FOUND"
    }

    if (orderItem.status == "AWAITING_PAYMENT") {
        return "AWAITING_PAYMENT"
    }

    if (orderItem.status == "CANCELED") {
        return "ITEM_CANCELED"
    }

    // The order (sorting) of statuses is important: a consumer cannot cancel an order if it's already in transit.
    let orderStatuses = [
        "AWAITING_PAYMENT", 
        "PROCESSING", 
        "AWAITING_TRANSPORT",
        "TRANSPORT_IMMINENT",
        "CANCELED",
        "IN_TRANSIT",
        "LAST_MILE",
        "FAILURE",
        "COMPLETE"
    ]

    let isValidTargetStatus;
    let isValidOriginStatus;

    // Checking if the target status is valid for the specified user

    switch (user.type) {
        case "CONSUMER":

            // A user can cancel an order if it isn't yet in transit
            isValidOriginStatus = orderStatuses.indexOf(orderItem.status) < orderStatuses.indexOf("IN_TRANSIT");

            isValidTargetStatus = [
                "CANCELED"]
                .includes(targetStatus)
            break;

        case "SUPPLIER":

            // A supplier can only change the status of orders in "PROCESSING" status
            isValidOriginStatus = orderItem.status == "PROCESSING"

            isValidTargetStatus = [
                "CANCELED", 
                "AWAITING_TRANSPORT"]
                .includes(targetStatus)
            break;

        case "TRANSPORTER":

            // A transporter can only change the order status if it's already at least in "AWAITING_TRANSPORT"

            isValidOriginStatus = orderStatuses.indexOf(orderItem.status) >= orderStatuses.indexOf("AWAITING_TRANSPORT")

            isValidTargetStatus = [
                "TRANSPORT_IMMINENT",
                "IN_TRANSIT",
                "LAST_MILE",
                "COMPLETE",
                "FAILURE"]
                .includes(targetStatus)
            break;

        case "ADMINISTRATOR":
            isValidTargetStatus = [
                "CANCELED"]
                .includes(targetStatus)
            break;

    }

    // Checking if the the user can change the status given the origin status

    if (!isValidOriginStatus) {
        return "INSUFFICIENT_PERMISSIONS"
    }

    // Checking if the user can change to target status

    if (!isValidTargetStatus) {
        return "INSUFFICIENT_PERMISSIONS"
    }

    // Checking if the status isn't going backwards

    if (!(
            orderStatuses.indexOf(targetStatus) >
            orderStatuses.indexOf(orderItem.status))) {

        return "REGRESSIVE_STATUS"
    }

    /* Event logic */

    let updatedOrderItem = await prisma.order_Item.update({
        where: {
            id_order: {
                order: orderID,
                id: itemID
            },
        },
        data: {
            status: targetStatus
        }
    })

    // Gathering additional data

    let productInfo = await prisma.product.findUnique({
        where: {
            id: orderItem.product
        },
        select: {
            name: true
        }
    })

    let transporter = await prisma.user.findUnique({
        where: {
            id: orderItem.transporter
        },
        include: {
            Company: true
        }
    })

    let supplier = await prisma.user.findUnique({
        where: {
            id: orderItem.supplier
        },
        include: {
            Company: true
        }
    })

    let vehicle = await prisma.vehicle.findUnique({
        where: {
            id_transporter: {
                id: orderItem.vehicle,
                transporter: orderItem.transporter
            }
        },
        select: {
            license_plate: true,
        }
    })

    let transporterInfo = {
        id: orderItem.transporter,
        name: transporter.Company ? transporter.Company.name : `${transporter.first_name} ${transporter.last_name}`
    }

    let supplierInfo = {
        id: orderItem.supplier,
        name: supplier.Company ? supplier.Company.name : `${supplier.first_name} ${supplier.last_name}`
    }

    // Sorting out event logic

    switch (targetStatus) {
        case "CANCELED": {
            
            // Notifying the user

            createNotification(order.consumer, 
                "Encomenda cancelada!",
                `A entrega do item #${itemID} (${productInfo.name}), da encomenda #${orderID}, foi cancelada!`,
                targetStatus,
                orderID,
                itemID
            );

            break;
        }

        case "AWAITING_TRANSPORT": {

            // Notifying the user

            createNotification(order.consumer, 
                "Progresso da encomenda atualizado!",
                `O item #${itemID} (${productInfo.name}), da encomenda #${orderID}, foi processado, estando agora à espera de ser levantado pelo transportador ${transporterInfo.name}!`,
                targetStatus,
                orderID,
                itemID
            );

            // Notifying the transporter that there's a new order which requires transport

            createNotification(orderItem.transporter,
                "Encomenda requer transporte!",
                `O item #${itemID}, da encomenda #${orderID}, está à espera de ser recolhido no armazém #${orderItem.warehouse} do fornecedor ${supplierInfo.name} (${supplierInfo.id}), pelo veículo de matrícula ${vehicle.license_plate}, tenha atenção!`,
                targetStatus,
                orderID,
                itemID)

            break;
        }

        case "TRANSPORT_IMMINENT": {

            // Notifying the user

            createNotification(order.consumer, 
                "Progresso da encomenda atualizado!",
                `O item #${itemID} (${productInfo.name}), da encomenda #${orderID}, está a ser levantado pelo transportador!`,
                targetStatus,
                orderID,
                itemID
            );
    
            // Notifying the supplier that the vehicle is arriving

            createNotification(orderItem.supplier, 
                "Encomenda prestes a ser recolhida!",
                `O item #${itemID}, da encomenda #${orderID}, está prestes a ser recolhido no seu armazém #${orderItem.warehouse}, pelo transportador ${transporterInfo.name} (${transporterInfo.id}), no veículo de matrícula ${vehicle.license_plate}, tenha atenção!`,
                targetStatus,
                orderID,
                itemID
            );
    
            break;
        }

        case "FAILURE": {

            // Notifying the user that something went wrong with the order

            createNotification(order.consumer, 
                "Encomenda falhada!",
                `A entrega do item #${itemID} (${productInfo.name}), da encomenda #${orderID}, falhou. Iremos contactá-lo brevemente ou enviar uma nova unidade.`,
                targetStatus,
                orderID,
                itemID
            );
    
            break;  
        }

        case "IN_TRANSIT": {

            // Notifying the user the order is on its way
            
            createNotification(order.consumer, 
                "Encomenda a caminho!",
                `O item #${itemID} (${productInfo.name}), da encomenda #${orderID}, acabou de ser enviado!`,
                targetStatus,
                orderID,
                itemID
            );

            break;

        }

        case "LAST_MILE": {

            // Notifying the user the order is almost there

            createNotification(order.consumer, 
                "Encomenda prestes a ser entregue!",
                `O item #${itemID} (${productInfo.name}), da encomenda #${orderID} está prestes a ser entregue pelo veículo de matrícula ${vehicle.license_plate}, tenha atenção!`,
                targetStatus,
                orderID,
                itemID
            );

            break;            

        }

        case "COMPLETE": {

            // Setting the arrival date
    
            await prisma.order_Item.update({
                where: {
                    id_order: {
                        order: orderID,
                        id: itemID
                    },
                },
                data: {
                    arrival_date: new Date()
                },
            })
    
            // Notifying the user the order has arrived

            createNotification(order.consumer, 
                "Encomenda entregue!",
                `O item #${itemID} (${productInfo.name}), da encomenda #${orderID} acabou de ser entregue!`,
                targetStatus,
                orderID,
                itemID
            );
    
            break;

        }

    }

}

/**
 * This function can be used to determine if a user is related to an order, and, if so, if he should be able to view its details.
 * @param {*} user - The user in question 
 * @param {*} orderID - The order in question
 * @returns - A boolean value which signifies if the user is in any way related to the order.
 */
async function checkUserOrderRelationship(user, orderID) {
    let order = await prisma.order.findUnique({
        where: {
            id: orderID
        }
    })

    // In case the order doesn't exist
    if (!order) {
        return false;
    }

    switch (user.type) {
        case "CONSUMER": {
            return order.consumer == user.id
        };
        
        case "SUPPLIER": {

            // Check if the supplier serves any OrderItems in this order
            let relatedOrderItems = await prisma.order_Item.count({
                where: {
                    order: orderID,
                    supplier: user.id
                }
            })

            return relatedOrderItems > 0
        }

        case "TRANSPORTER": {
            // Check if the transporter serves any OrderItems in this order
            let relatedOrderItems = await prisma.order_Item.count({
                where: {
                    order: orderID,
                    transporter: user.id
                }
            })

            return relatedOrderItems > 0
        }

        case "ADMINISTRATOR": {
            return true;
        }
    }
}

/**
 * This function can be used to check if a user is related to a specific orderItem, in case they're trying to edit its status
 */
async function checkUserItemRelationship(user, orderID, itemID) {
    let orderItem = await prisma.order_Item.findUnique({
        where: {
            id_order: {
                order: orderID,
                id: itemID
            },
        },
        include: {
            Order: true
        }
    })

    switch (user.type) {
        case "CONSUMER": {
            return orderItem.Order.consumer == user.id
        };
        
        case "SUPPLIER": {
            // Checking if the user supplies the specified orderItem

            return orderItem.supplier == user.id
        }

        case "TRANSPORTER": {
            // Check if the user transports the orderItem

            return orderItem.transporter == user.id
        }

        case "ADMINISTRATOR": {
            return true;
        }
    }
}

/* Notifications */

async function createNotification(userID, title, content, scope, relatedOrderID, relatedItemID) {

    let lastestNotification = await prisma.notification.findFirst({
        where: {
            user: userID
        },
        orderBy: {
            id: 'desc'
        }
    })

    let notificationCount = lastestNotification ? lastestNotification.id : 0

    let notificationData = {
        id: notificationCount + 1,
        title: title,
        content: content,
        user: userID,
        scope: scope,
        dismissed: false,
        timestamp: new Date()
    }

    if (relatedOrderID) {
        notificationData.order = relatedOrderID

        if (relatedItemID) {
            notificationData.order_item = relatedItemID
        }
    }

    await prisma.notification.create({
        data: notificationData
    })
}

/* Notification functions */

async function getNotificationsByUser(userID) {
    return await prisma.notification.findMany({
        where: {
            user: userID
        },
        orderBy: {
            timestamp: 'desc'
        }
    })
}

async function dismissAllNotifications(userID) {
    try {
        await prisma.notification.updateMany({
            where: {
                user: userID
            },
            data: {
                dismissed: true
            }
        })
    
        return true
    } catch (e) {
        return null
    }
}

async function dismissNotification(userID, notificationID) {
    try {
        let dismissedNotification = await prisma.notification.update({
            where: {
                user_id: {
                    user: userID,
                    id: notificationID
                }
            },
            data: {
                dismissed: true
            }
        })
    
        if (!dismissedNotification) {
            return "NOT_FOUND"
        }
    
        return true
    } catch (e) {
        console.log('e :>> ', e);
        return null
    }

    
}

/* Warehouse Functions */

async function getWarehouses(userID) {
    try {
        
        let warehouses = await prisma.warehouse.findMany({
            where: {
                supplier: userID
            },
            select: {
                id: true,
                address: true,
                capacity: true,
                renewable_resources: true,
                resource_usage: true,
            }
        })

        // Cleaning and adding data

        warehouses = await Promise.all(warehouses.map(async (warehouse) => {

            let address = await prisma.address.findUnique({
                where: {
                    id: warehouse.address
                }, select: {
                    id: true,
                    street: true,
                    country: true,
                    city: true,
                    latitude: true,
                    longitude: true,
                    postal_code: true
                }
            })

            let supplies = await prisma.supply.findMany({
                where: {
                    supplier: userID,
                    warehouse: warehouse.id
                }
            })

            // Calculating how many different products and individual units the warehouse has, along with its total value
            let uniqueProductCount = supplies.length
            let combinedStock = supplies.reduce((accumulator, supply) => accumulator + supply.quantity, 0)
            let totalValue = supplies.reduce((accumulator, supply) => accumulator + supply.quantity * supply.price, 0)

            warehouse.address = address
            warehouse.unique_products = uniqueProductCount
            warehouse.combined_stock = combinedStock
            warehouse.total_value = round(totalValue, 2)

            // Usage data (estimated total daily energy usage)
            let totalResourceUsage = round(warehouse.resource_usage * combinedStock, 2)

            warehouse.estimated_total_resource_usage = totalResourceUsage

            return warehouse
        }))

        return warehouses

    } catch (e) {
        console.log(e);
        return null
    }
}

async function getWarehouse(userID, warehouseID) {

    try {

        let warehouse = await prisma.warehouse.findUnique({
            where: {
                id_supplier: {
                    supplier: userID,
                    id: warehouseID
                }
            },
            select: {
                id: true,
                Address: {
                    select: {
                        id: true,
                        street: true,
                        country: true,
                        city: true,
                        latitude: true,
                        longitude: true,
                        postal_code: true
                    }
                },
                capacity: true,
                renewable_resources: true,
                resource_usage: true,
                Supply: {
                    where: {
                        supplier: userID
                    },
                    select: {
                        Product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                Category: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                            }
                        },
                        quantity: true,
                        price: true,
                        expiration_date: true,
                        production_date: true
                    }
                }
            }
        })

        if (!warehouse) {
            return "INVALID_WAREHOUSE"
        }

        // Cleaning data

        delete Object.assign(warehouse, {supplies: warehouse.Supply}).Supply;

        delete Object.assign(warehouse, {address: warehouse.Address}).Address;

        warehouse.supplies.forEach((supply) => {
            delete Object.assign(supply, {product: supply.Product}).Product;

            delete Object.assign(supply.product, {category: supply.product.Category}).Category;
        })

        // Calculating how many different products and individual units the warehouse has, along with its total value
        let uniqueProductCount = warehouse.supplies.length
        let combinedStock = warehouse.supplies.reduce((accumulator, supply) => accumulator + supply.quantity, 0)
        let totalValue = warehouse.supplies.reduce((accumulator, supply) => accumulator + supply.quantity * supply.price, 0)

        warehouse.unique_products = uniqueProductCount
        warehouse.combined_stock = combinedStock
        warehouse.total_value = round(totalValue, 2)

        // Usage data (estimated total daily energy usage)
        let totalResourceUsage = round(warehouse.resource_usage * combinedStock, 2)

        warehouse.estimated_total_resource_usage = totalResourceUsage
        

        return warehouse
        
    } catch (e) {
        console.log(e)
        return null
    }

}

async function createWarehouse(userID, addressID, capacity, resourceUsage, renewableResources) {
    
    try {
        let address = await prisma.address.findUnique({
            where: {
                id: addressID
            }
        })

        // In case the selected address doesn't exist or doesn't belong to the user

        if (!address || address.user != userID) {
            return "INVALID_ADDRESS"
        }

        // In case this address is already being used by the user for another warehouse

        let addressAlreadyInUse = await prisma.warehouse.findFirst({
            where: {
                supplier: userID,
                address: addressID
            }
        })

        if (addressAlreadyInUse) {
            return "ADDRESS_IN_USE"
        }

        let latestWarehouse = await prisma.warehouse.findFirst({
            where: {
                supplier: userID
            },
            orderBy: {
                id: 'desc'
            }
        })

        let warehouseCount = latestWarehouse ? latestWarehouse.id : 0

        let newWarehouse = await prisma.warehouse.create({
            data: {
                id: warehouseCount + 1,
                supplier: userID,
                address: addressID,
                capacity: capacity,
                resource_usage: resourceUsage,
                renewable_resources: renewableResources
            }
        })

        return newWarehouse.id


    } catch (e) {
        console.log('e :>> ', e);
        return null
    }
}

async function updateWarehouse(userID, warehouseID, params) {
    try {

        // Proofing

        let warehouse = await prisma.warehouse.findUnique({
            where: {
                id_supplier: {
                    id: warehouseID,
                    supplier: userID
                }
            }
        })

        if (!warehouse) {
            return "INVALID_WAREHOUSE"
        }

        // Determining which data to edit

        let warehouseKeyMap = [
            "address",
            "capacity",
            "resource_usage",
            "renewable_resources"
        ]

        let updatedWarehouseData = {}

        for (const [key, value] of Object.entries(params)) {
            if (warehouseKeyMap.includes(key)) {                
                updatedWarehouseData[key] = value
            }
        }
        
        // Checking if the new selected address is valid

        if ("address" in updatedWarehouseData) {
            let address = await prisma.address.findUnique({
                where: {
                    id: updatedWarehouseData.address
                }
            })
    
            // In case the selected address doesn't exist or doesn't belong to the user
    
            if (!address || address.user != userID) {
                return "INVALID_ADDRESS"
            }
    
            // In case this address is already being used by the user for another warehouse (except the current one)
    
            let addressAlreadyInUse = await prisma.warehouse.findFirst({
                where: {
                    supplier: userID,
                    address: updatedWarehouseData.address
                }
            })

            if (addressAlreadyInUse && warehouse.address != address.id) {
                return "ADDRESS_IN_USE"
            }
        }

        // Updating the warehouse

        let updatedWarehouse = await prisma.warehouse.update({
            where: {
                id_supplier: {
                    id: warehouseID,
                    supplier: userID
                }
            },
            data: updatedWarehouseData
        })

    } catch (e) {
        return null
    }
}

async function deleteWarehouse(userID, warehouseID) {

    // TODO: PROOF FOR SOFT-DELETE


    try {
        // Proofing

        let warehouse = await prisma.warehouse.findUnique({
            where: {
                id_supplier: {
                    id: warehouseID,
                    supplier: userID
                }
            },
            select: {
                Supply: {
                    where: {
                        supplier: userID
                    }
                }
            }
        })

        if (!warehouse) {
            return "INVALID_WAREHOUSE"
        }

        // A warehouse cannot be removed if there are still supplies registered to it

        if (warehouse.Supply.length) {
            return "WAREHOUSE_NOT_EMPTY"
        }

        // Removing the warehouse
    
        let removedWarehouse = await prisma.warehouse.delete({
            where: {
                id_supplier: {
                    supplier: userID,
                    id: warehouseID
                }
            }
        })

    } catch (e) {
        return null
    }

}

/* Distribution Center Functions */

async function getDistributionCenters(userID) {

    try {
        
        let centers = await prisma.distribution_Center.findMany({
            where: {
                transporter: userID
            },
            select: {
                id: true,
                address: true,
                capacity: true
            }
        })

        // Cleaning and adding data

        centers = await Promise.all(centers.map(async (center) => {

            let address = await prisma.address.findUnique({
                where: {
                    id: center.address
                }, select: {
                    id: true,
                    street: true,
                    country: true,
                    city: true,
                    latitude: true,
                    longitude: true,
                    postal_code: true
                }
            })

            let vehicles = await prisma.vehicle.findMany({
                where: {
                    transporter: userID,
                    distribution_center: center.id
                }
            })

            center.address = address
            center.total_vehicles = vehicles.length

            return center

        }))

        return centers


    } catch (e) {
        return null
    }

}

async function getDistributionCenter(userID, centerID) {

    try {
        
        let center = await prisma.distribution_Center.findUnique({
            where: {
                id_transporter: {
                    transporter: userID,
                    id: centerID
                }
            },
            select: {
                id: true,
                capacity: true,
                address: true
            }
        })

        if (!center) {
            return "INVALID_DISTRIBUTION_CENTER"
        }

        let address = await prisma.address.findUnique({
            where: {
                id: center.address
            }, select: {
                id: true,
                street: true,
                country: true,
                city: true,
                latitude: true,
                longitude: true,
                postal_code: true
            }
        })

        let vehicles = await prisma.vehicle.findMany({
            where: {
                transporter: userID,
                distribution_center: center.id
            }, select: {
                id: true,
                resource_usage: true,
                average_emissions: true,
                license_plate: true,
                fuel_type: true,
                payload_capacity: true
            }
        })

        center.address = address
        center.vehicles = vehicles
        center.total_vehicles = vehicles.length

        return center

    } catch (e) {
        return null
    }

}

async function createDistributionCenter(userID, addressID, capacity) {
    try {
        
        let address = await prisma.address.findUnique({
            where: {
                id: addressID
            }
        })

        // In case the selected address doesn't exist or doesn't belong to the user

        if (!address || address.user != userID) {
            return "INVALID_ADDRESS"
        }

        // In case this address is already being used by the user for another distribution center

        let addressAlreadyInUse = await prisma.distribution_Center.findFirst({
            where: {
                transporter: userID,
                address: addressID
            }
        })

        if (addressAlreadyInUse) {
            return "ADDRESS_IN_USE"
        }

        let latestCenter = await prisma.distribution_Center.findFirst({
            where: {
                transporter: userID
            },
            orderBy: {
                id: 'desc'
            }
        })

        let centerCount = latestCenter ? latestCenter.id : 0

        let newCenter = await prisma.distribution_Center.create({
            data: {
                id: centerCount + 1,
                transporter: userID,
                address: addressID,
                capacity: capacity,
            }
        })

        return newCenter.id
        
    } catch (e) {
        return null
    }
}

async function updateDistributionCenter(userID, centerID, params) {

    try {
    
        // Proofing

        let center = await prisma.distribution_Center.findUnique({
            where: {
                id_transporter: {
                    id: centerID,
                    transporter: userID
                }
            }
        })

        if (!center) {
            return "INVALID_DISTRIBUTION_CENTER"
        }

        // Determining which data to edit

        let centerKeyMap = [
            "address",
            "capacity"
        ]

        let updatedCenterData = {}

        for (const [key, value] of Object.entries(params)) {
            if (centerKeyMap.includes(key)) {                
                updatedCenterData[key] = value
            }
        }
        
        // Checking if the new selected address is valid

        if ("address" in updatedCenterData) {
            let address = await prisma.address.findUnique({
                where: {
                    id: updatedCenterData.address
                }
            })
    
            // In case the selected address doesn't exist or doesn't belong to the user
    
            if (!address || address.user != userID) {
                return "INVALID_ADDRESS"
            }
    
            // In case this address is already being used by the user for another center (except the current one)
    
            let addressAlreadyInUse = await prisma.distribution_Center.findFirst({
                where: {
                    transporter: userID,
                    address: updatedCenterData.address
                }
            })

            if (addressAlreadyInUse && center.address != address.id) {
                return "ADDRESS_IN_USE"
            }
        }

        // Updating the center

        let updatedCenter = await prisma.distribution_Center.update({
            where: {
                id_transporter: {
                    id: centerID,
                    transporter: userID
                }
            },
            data: updatedCenterData
        })

    } catch (e) {
        console.log('e :>> ', e);
        return null
    }

}

async function deleteDistributionCenter(userID, centerID) {
    // TODO: PROOF FOR SOFT-DELETE

    try {
        // Proofing

        let center = await prisma.distribution_Center.findUnique({
            where: {
                id_transporter: {
                    id: centerID,
                    transporter: userID
                }
            },
            select: {
                Vehicle: {
                    where: {
                        transporter: userID,
                        distribution_center: centerID
                    }
                }
            }
        })

        if (!center) {
            return "INVALID_DISTRIBUTION_CENTER"
        }

        // A center cannot be removed if there are still supplies registered to it

        if (center.Vehicle.length) {
            return "DISTRIBUTION_CENTER_NOT_EMPTY"
        }

        // Removing the center
    
        let removedCenter = await prisma.distribution_Center.delete({
            where: {
                id_transporter: {
                    transporter: userID,
                    id: centerID
                }
            }
        })

        return removedCenter

    } catch (e) {
        return null
    }

}

async function getVehicles(userID) {

    try {
        
        let vehicles = await prisma.vehicle.findMany({ 
            where: {
                transporter: userID
            },
            select: {
                id: true,
                resource_usage: true,
                license_plate: true,
                fuel_type: true,
                payload_capacity: true,
                average_emissions: true,
                distribution_center: true
            }
        })

        // Gathering and cleaning data

        await Promise.all(vehicles.map(async (vehicle) => {

            let assignedOrders = await prisma.order_Item.findMany({
                where: {
                    vehicle: vehicle.id,
                    transporter: userID
                }
            })

            let distributionCenter = await prisma.distribution_Center.findUnique({
                where: {
                    id_transporter: {
                        id: vehicle.distribution_center,
                        transporter: userID
                    }
                },
                select: {
                    id: true,
                    capacity: true,
                    Address: {
                        select: {
                            id: true,
                            street: true,
                            country: true,
                            city: true,
                            latitude: true,
                            longitude: true,
                            postal_code: true
                        }
                    }
                }
            })
            
            // Cleaning
            delete Object.assign(distributionCenter, {address: distributionCenter.Address}).Address;


            // Counting related orders
            vehicle.total_orders_assigned = assignedOrders.length

            // Calculating orders in transit
            vehicle.orders_in_transit = assignedOrders.reduce(
                (accumulator, item) => (["IN_TRANSIT", "LAST_MILE"].includes(item.status) ? accumulator + 1 : accumulator), 0)
            
            // Calculating orders completed
            vehicle.orders_completed = assignedOrders.reduce(
                (accumulator, item) => (item.status == "COMPLETE" ? accumulator + 1 : accumulator), 0)

            // Calculating orders failed
            vehicle.orders_failed = assignedOrders.reduce(
                (accumulator, item) => (item.status == "FAILURE" ? accumulator + 1 : accumulator), 0)

            vehicle.distribution_center = distributionCenter

            return vehicle
        }))

        return vehicles

    } catch (e) {
        console.log('e :>> ', e);
        return null
    }

}

async function createVehicle(
    userID,
    distributionCenterID,
    licensePlate,
    payloadCapacity,
    resourceUsage,
    averageEmissions,
    fuelType) {

    try {

        // Checking if the license plate is already registered

        let licensePlateInUse = await prisma.vehicle.findFirst({
            where: {
                license_plate: licensePlate
            }
        })

        if (licensePlateInUse) {
            return "LICENSE_PLATE_CONFLICT"
        }

        let distributionCenter = await prisma.distribution_Center.findUnique({
            where: {
                id_transporter: {
                    transporter: userID,
                    id: distributionCenterID
                }
            }
        })

        if (!distributionCenter) {
            return "INVALID_DISTRIBUTION_CENTER"
        }

        // Creating a new vehicle

        let latestVehicle = await prisma.vehicle.findFirst({
            where: {
                transporter: userID
            },
            orderBy: {
                id: 'desc'
            }
        })

        let vehicleCount = latestVehicle ? latestVehicle.id : 0

        let newVehicle = await prisma.vehicle.create({
            data: {
                id: vehicleCount + 1,
                transporter: userID,
                distribution_center: distributionCenterID,
                license_plate: licensePlate,
                payload_capacity: payloadCapacity,
                resource_usage: resourceUsage,
                average_emissions: averageEmissions,
                fuel_type: fuelType
            }
        })

        return {
            id: newVehicle.id
        }


    } catch (e) {
        console.log('e :>> ', e);
        return null
    }

}

async function updateVehicle(userID, vehicleID, params) {

    try {
        
        // Proofing

        let vehicle = await prisma.vehicle.findUnique({
            where: {
                id_transporter: {
                    transporter: userID,
                    id: vehicleID
                }
            }
        })

        if (!vehicle) {
            return "INVALID_VEHICLE"
        }

        let updatedVehicleData = {}

        let vehicleKeyMap = [
            "distribution_center",
            "license_plate",
            "payload_capacity",
            "resource_usage",
            "average_emissions",
            "fuel_type"
        ]

        for (const [key, value] of Object.entries(params)) {
            if (vehicleKeyMap.includes(key)) {                
                updatedVehicleData[key] = value
            }
        }

        // If a new distribution center is selected, make sure it's valid

        if ("distribution_center" in updatedVehicleData) {

            let validCenter = await prisma.distribution_Center.findUnique({ 
                where: {
                    id_transporter: {
                        transporter: userID,
                        id: updatedVehicleData["distribution_center"]
                    }
                }
            })

            if (!validCenter) {
                return "INVALID_DISTRIBUTION_CENTER"
            }

        }

        // If a new license plate is selected, make sure it isn't being used

        if ("license_plate" in updatedVehicleData) {
            
            let licensePlateInUse = await prisma.vehicle.findFirst({
                where: {
                    license_plate: updatedVehicleData["license_plate"]
                }
            })
    
            // If the license plate is in use (it's alright if its the current vehicle)
            if (licensePlateInUse && 
                !(licensePlateInUse.transporter == userID &&
                     licensePlateInUse.id == vehicleID)) {
                return "LICENSE_PLATE_CONFLICT"
            }

        }

        // Updating the vehicle

        let updatedVehicle = await prisma.vehicle.update({
            where: {
                id_transporter: {
                    transporter: userID,
                    id: vehicleID
                }
            },
            data: updatedVehicleData
        })

    } catch (e) {
        return null
    }

}

async function deleteVehicle(userID, vehicleID) {

    // TODO: Proof this for soft-delete

    try {
        
        let vehicle = await prisma.vehicle.findUnique({
            where: {
                id_transporter: {
                    transporter: userID,
                    id: vehicleID
                }
            }
        })

        if (!vehicle) {
            return "INVALID_VEHICLE"
        }

        let assignedOrders = await prisma.order_Item.findMany({
            where: {
                transporter: userID,
                vehicle: vehicleID
            }
        })

        // Checking if vehicle is currently required

        let hasIncompleteOrders = assignedOrders.some((item) => {
            return [
                "AWAITING_PAYMENT", 
                "PROCESSING",
                "AWAITING_TRANSPORT",
                "TRANSPORT_IMMINENT", 
                "IN_TRANSIT", 
                "LAST_MILE"].includes(item.status)
        })

        if (hasIncompleteOrders) {
            return "VEHICLE_BUSY"
        }

        // Deleting vehicle

        await prisma.vehicle.delete({
            where: {
                id_transporter: {
                    transporter: userID,
                    id: vehicleID
                }
            }
        })

    } catch (e) {
        console.log('e :>> ', e);
        return null
    }

}

/* Supply Functions */

async function getInventory(userID) {

    try {
        
        let inventory = await prisma.supply.findMany({
            where: {
                supplier: userID
            },
            select: {
                id: true,
                product: true,
                warehouse: true,
                quantity: true,
                price: true,
                production_date: true,
                expiration_date: true
            }
        })

        // Gathering additional information

        inventory = await Promise.all(inventory.map(async (item) => {

            item.product = await prisma.product.findUnique({
                where: {
                    id: item.product
                }, select: {
                    id: true,
                    name: true,
                    category: true
                }
            })

            item.product.category = await prisma.category.findUnique({
                where: {
                    id: item.product.category
                },
                select: {
                    id: true,
                    name: true
                }
            })

            item.warehouse = await prisma.warehouse.findUnique({
                where: {
                    id_supplier: {
                        id: item.warehouse,
                        supplier: userID
                    }
                }, 
                select: {
                    id: true,
                    Address: true
                }
            })

            delete Object.assign(item.warehouse, {address: item.warehouse.Address}).Address;

            return item
        }))

        return inventory


    } catch (e) {
        console.log(e);
        return null
    }

}

async function getSupply(userID, supplyID) {

    try {
        let item = await prisma.supply.findFirst({
            where: {
                supplier: userID,
                id: supplyID
            },
            select: {
                product: true,
                warehouse: true,
                quantity: true,
                price: true,
                production_date: true,
                expiration_date: true
            }
        })
    
        if (!item) {
            return "INVALID_SUPPLY"
        }
    
        item.product = await prisma.product.findUnique({
            where: {
                id: item.product
            }, select: {
                id: true,
                name: true,
                category: true
            }
        })
    
        item.product.category = await prisma.category.findUnique({
            where: {
                id: item.product.category
            },
            select: {
                id: true,
                name: true
            }
        })
    
        item.warehouse = await prisma.warehouse.findUnique({
            where: {
                id_supplier: {
                    id: item.warehouse,
                    supplier: userID
                }
            }, 
            select: {
                id: true,
                Address: true
            }
        })
    
        delete Object.assign(item.warehouse, {address: item.warehouse.Address}).Address;
    
        item.transports = await prisma.supply_Transporter.findMany({
            where: {
                supplier: userID,
                product: item.product.id,
                warehouse: item.warehouse.id
            },
            select: {
                transporter: true,
                price: true
            }
        })
    
        item.transports = await Promise.all(
            item.transports.map(
                async (transport) => {
    
                    let transporterDetails = await prisma.user.findUnique({
                        where: {
                            id: transport.transporter
                        },
                        select: {
                            id: true,
                            Company: true
                        }
                    })
    
                    // Gather average emissions based on all transporter vehicles
                    let vehicle_averages = await prisma.vehicle.aggregate({
                        where: {
                            transporter: transporterDetails.id
                        },
                        _avg: {
                            average_emissions: true,
                            resource_usage: true
                        },
                    })
    
                    transport.transporter = {
                        id: transporterDetails.id,
                        name: transporterDetails.Company ? transporterDetails.Company.name : `${transporterDetails.first_name} ${transporterDetails.last_name}`,
                        average_emissions: vehicle_averages._avg.average_emissions,
                        average_resource_usage: vehicle_averages._avg.resource_usage
                    }
    
                    return transport
    
                }))
    
        item.history = await prisma.supply_History.findMany({
            where: {
                supplier: userID,
                warehouse: item.warehouse.id,
                product: item.product.id
            },
            select: {
                moment: true,
                quantity: true,
                price: true
            }
        })
    
        return item
    } catch (e) {
        console.log('e :>> ', e);
        return null
    }
}

async function createSupply(
    userID,
    productID,
    warehouseID,
    quantity,
    price,
    production_date,
    expiration_date) {


        try {
            
            // Validating product

            let product = await prisma.product.findUnique({
                where: {
                    id: productID
                }
            })

            if (!product) {
                return "INVALID_PRODUCT"
            }

            // Validating warehouse

            let warehouse = await prisma.warehouse.findUnique({
                where: {
                    id_supplier: {
                        supplier: userID,
                        id: warehouseID
                    }
                }
            })

            if (!warehouse) {
                return "INVALID_WAREHOUSE"
            }

            // Checking for duplicate supplies

            let duplicateSupply = await prisma.supply.findUnique({
                where: {
                    product_supplier_warehouse: {
                        product: productID,
                        supplier: userID,
                        warehouse: warehouseID
                    }
                }
            })

            if (duplicateSupply) {
                return "SUPPLY_CONFLICT"
            }


            // If everything checks out, create the supply

            let supplyCount = await prisma.supply.count({
                where: {
                    supplier: userID
                }
            })

            let newSupply = await prisma.supply.create({
                data: {
                    id: supplyCount + 1,
                    product: productID,
                    warehouse: warehouseID,
                    supplier: userID,
                    price: price,
                    quantity: quantity,
                    production_date: new Date(production_date),
                    expiration_date: new Date(expiration_date)
                }
            })

            return newSupply.id

        } catch (e) {
            console.log(e)
            return null
        }
}

async function updateSupply(userID, supplyID, params) {

    try {
        
        let specifiedSupply = await prisma.supply.findFirst({
            where: {
                supplier: userID,
                id: supplyID
            }
        })

        if (!specifiedSupply) {
            return "INVALID_SUPPLY"
        }

        // Determining which fields to update

        let updatedSupplyData = {}

        let supplyKeyMap = [
            "price",
            "quantity",
            "production_date",
            "expiration_date"
        ]

        for (const [key, value] of Object.entries(params)) {
            if (supplyKeyMap.includes(key)) {

                // Correctly typecasting value
                if (["production_date", "expiration_date"].includes(key)) {
                    updatedSupplyData[key] = new Date(value)
                } else {
                    updatedSupplyData[key] = value
                }

            }
        }

        // Updating Supply

        let updatedSupply = await prisma.supply.update({
            where: {
                product_supplier_warehouse: {
                    product: specifiedSupply.product,
                    supplier: userID,
                    warehouse: specifiedSupply.warehouse
                },
            },
            data: updatedSupplyData
        })

    } catch (e) {
        console.log(e)
        return null
    }

}

async function deleteSupply(userID, supplyID) {

    try {
        
        let specifiedSupply = await prisma.supply.findFirst({
            where: {
                supplier: userID,
                id: supplyID
            }
        })

        if (!specifiedSupply) {
            return "INVALID_SUPPLY"
        }

        // Deleting Supply

        let deletedSupply = await prisma.supply.delete({
            where: {
                product_supplier_warehouse: {
                    product: specifiedSupply.product,
                    supplier: userID,
                    warehouse: specifiedSupply.warehouse
                }
            }
        })

    } catch (e) {
        console.log(e)
        return null
    }

}

async function createSupplyTransport(userID, supplyID, transporterID, price) {

    try {
        
        // Proofing

        let specifiedSupply = await prisma.supply.findFirst({
            where: {
                supplier: userID,
                id: supplyID
            }
        })

        if (!specifiedSupply) {
            return "INVALID_SUPPLY"
        }

        let specifiedTransporter = await prisma.user.findFirst({
            where: {
                id: transporterID,
                type: "TRANSPORTER"
            }
        })

        if (!specifiedTransporter) {
            return "INVALID_TRANSPORTER"
        }

        // Checking for conflit

        let duplicateTransport = await prisma.supply_Transporter.findUnique({
            where: {
                product_supplier_warehouse_transporter: {
                    product: specifiedSupply.product,
                    supplier: userID,
                    warehouse: specifiedSupply.warehouse,
                    transporter: transporterID
                }
            }
        })

        if (duplicateTransport) {
            return "TRANSPORT_CONFLICT"
        }

        // If all went well, create a new transport

        let newTransport = await prisma.supply_Transporter.create({
            data: {
                product: specifiedSupply.product,
                supplier: userID,
                warehouse: specifiedSupply.warehouse,
                transporter: transporterID,
                price: price
            }
        })
        
    } catch (e) {
        console.log(e)
        return null
    }

}

async function updateSupplyTransport(userID, supplyID, transporterID, price) {

    try {
        
        // Proofing

        let specifiedSupply = await prisma.supply.findFirst({
            where: {
                supplier: userID,
                id: supplyID
            }
        })

        if (!specifiedSupply) {
            return "INVALID_SUPPLY"
        }

        let specifiedTransport = await prisma.supply_Transporter.findUnique({
            where: {
                product_supplier_warehouse_transporter: {
                    product: specifiedSupply.product,
                    supplier: userID,
                    warehouse: specifiedSupply.warehouse,
                    transporter: transporterID
                }
            }
        })

        if (!specifiedTransport) {
            return "INVALID_TRANSPORTER"
        }

        // If everything checks out, update the price

        let updatedSupplyTransport = await prisma.supply_Transporter.update({
            where: {
                product_supplier_warehouse_transporter: {
                    product: specifiedSupply.product,
                    supplier: userID,
                    warehouse: specifiedSupply.warehouse,
                    transporter: transporterID
                }
            },
            data: {
                price: price
            }
        })

    } catch (e) {
        console.log(e)
        return null
    }

}

async function deleteSupplyTransport(userID, supplyID, transporterID) {

    try {
        
         // Proofing

         let specifiedSupply = await prisma.supply.findFirst({
            where: {
                supplier: userID,
                id: supplyID
            }
        })

        if (!specifiedSupply) {
            return "INVALID_SUPPLY"
        }

        let specifiedTransport = await prisma.supply_Transporter.findUnique({
            where: {
                product_supplier_warehouse_transporter: {
                    product: specifiedSupply.product,
                    supplier: userID,
                    warehouse: specifiedSupply.warehouse,
                    transporter: transporterID
                }
            }
        })

        if (!specifiedTransport) {
            return "INVALID_TRANSPORTER"
        }

        // If everything checks out, delete transport

        let deletedTransport = await prisma.supply_Transporter.delete({
            where: {
                product_supplier_warehouse_transporter: {
                    product: specifiedSupply.product,
                    supplier: userID,
                    warehouse: specifiedSupply.warehouse,
                    transporter: transporterID
                }
            }
        })

    } catch (e) {
        console.log(e)
        return null
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

    // Transporter Information Functions
    getAllTransporters,

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
    clearWishlist,

    // Order Functions
    getOrdersByUser,
    getOrderByID,
    getFilteredOrderByID,
    createOrder,
    changeOrderStatus,
    decrementSupplyStock,
    checkUserOrderRelationship,
    updateOrderItem,
    checkUserItemRelationship,

    // Notification Functions
    getNotificationsByUser,
    dismissNotification,
    dismissAllNotifications,

    // Warehouse Functions
    getWarehouses,
    getWarehouse,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,

    // Distribution Center Functions
    getDistributionCenters,
    getDistributionCenter,
    createDistributionCenter,
    updateDistributionCenter,
    deleteDistributionCenter,

    // Vehicles Functions
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,

    // Supply Functions
    getInventory,
    getSupply,
    createSupply,
    updateSupply,
    deleteSupply,
    createSupplyTransport,
    updateSupplyTransport,
    deleteSupplyTransport

}