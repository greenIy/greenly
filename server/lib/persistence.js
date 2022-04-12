/*  Greenly Persistence Library
    Functions included pertain to database access and manipulation.
*/

const { PrismaClient, Prisma, } = require('@prisma/client');
const {Client} = require("@googlemaps/google-maps-services-js");
const bcrypt = require('bcrypt');
const { check, boolean } = require('yargs');
const argv = require('../server').argv

// Use 10 salt rounds for each hash
const saltRounds = 10;

// Round coordinates to 6 decimal places
const coordinateRound = 6;


const prisma = new PrismaClient({ 
    // Log database operations if -m flag is present
    log: argv.m || argv.databaseMonitoring ? ['query', 'info', 'warn', 'error'] : []
});
const maps = new Client();


/* User Functions */

/* Returns user object on creation, or null if invalid */
async function createUser(params) {
    try {
        let newUser = await prisma.user.create({
            data: {
                first_name: params.first_name,
                last_name: params.last_name,
                nif: params.nif,
                email: params.email,
                phone: params.phone,
                password: bcrypt.hashSync(params.password, saltRounds),
                type: params.type
            }
        })

        try {
            const geocoded = await maps.geocode({
                params: {
                    address: `${params.address.street}, ${params.address.city}, ${params.address.country}`,
                    key: process.env.GOOGLE_API_KEY
                }
            })

            lat = round(geocoded.data.results[0].geometry.location.lat, coordinateRound);
            lng = round(geocoded.data.results[0].geometry.location.lng, coordinateRound);
        } catch {
            lat = 0;
            lng = 0;
        }

        // TODO: Rewrite this with prisma's nested writes!
        const newAddress = await prisma.address.create({
            data: {
                street: params.address.street,
                country: params.address.country,
                city: params.address.city,
                // Using dummy values for testing. Use this for API call:
                // geocoded.data.results[0].geometry.location.lat
                // geocoded.data.results[0].geometry.location.lng
                latitude: lat,
                longitude: lng,
                postal_code: params.address.postal_code
            }
        })

        let updateDataSelection = {
            address: newAddress.id
        }

        // Create a new company if the user is a transporter or a supplier
        if (["TRANSPORTER", "SUPPLIER"].includes(newUser.type)) {
            const newCompany = await prisma.company.create({
                data: {
                    name: params.company.name,
                    bio: params.company.bio,
                    email: params.company.email
                }
            })

            updateDataSelection.company = newCompany.id
        }

        // Updating the user's address and company after we're sure user creation didn't go wrong.

        newUser = await prisma.user.update({
            where: {
                id: newUser.id
            },
            data: updateDataSelection
        })

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
        nif: "nif",
        email: "email",
        phone: "phone",
        type: "type",
        new_password: "password"
    }

    const addressKeyMap = {
        street: "street",
        city: "city",
        postal_code: "postal_code",
        country: "country"
    }

    const userDataSelection = {}
    const addressDataSelection = {}

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
    
    // If address data is included, map address data

    if (params.hasOwnProperty("address")) {
        for (const [key, value] of Object.entries(params.address)) {
            if (key in addressKeyMap) {
                addressDataSelection[addressKeyMap[key]] = value
            }
        }
    }

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: userDataSelection
        }).then((result) => {
            return result;
        })

        const updatedAddress = await prisma.address.update({
            where: {
                id: updatedUser.address
            },
            data: addressDataSelection
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
        */

        if (getUserByID(id)) {
            // Delete user
            const deletedUser = await prisma.user.delete({
                where: {
                    id: id
                }
            })

            // Delete the user's address
            const deletedAddress = await prisma.address.delete({
                where: {
                    id: deletedUser.address
                }
            })

            return true
        } else {
            return false
        }

    } catch {
        return false;
    }

}

async function getAllUsers() {
    return users = await prisma.user.findMany({
        select: {
            id: true,
            nif: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            type: true,
            Address: {
                select: {
                    street: true,
                    city: true,
                    postal_code: true,
                    country: true
                }
            },
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
                nif: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true,
                type: true,
                password: withPassword,
                Address: {
                    select: {
                        street: true,
                        city: true,
                        postal_code: true,
                        country: true
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
    try {
        return user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                nif: true,
                first_name: true,
                last_name: true,
                email: true,
                phone: true,
                type: true,
                password: withPassword,
                Address: {
                    select: {
                        street: true,
                        city: true,
                        postal_code: true,
                        country: true
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
    // Should be used for email, phone and NIF
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
        } else if (attribute == "nif") {
            result = await prisma.user.findUnique({
                'where': {
                    nif: value
                }
            })
        }
    
        return result;
    } catch (e) {
        return null;
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
                              keywords) {
    /* TODO: Since sorting by minimum in a relationship isn't support by Prisma, and views are barely viable,
     this entire function may have to be rewritten in raw SQL, as well as the corresponding route logic over at 
     api/store.js GET /store/products
     */

    let filterSelection = {}

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

    // Calculate total pages according to provided filters
    let totalPages = Math.ceil(await prisma.product.count({
        where: filterSelection
    })/limit)

    // Get products based on provided filters
    let products = await prisma.product.findMany({
        skip: (page-1)*limit,
        take: limit,
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
    });

    return {totalPages, products}
}

async function getProductByID(id){
    try {
        return product = await prisma.product.findUnique({
            where: {
                id: id
            },
            select: {
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
                Supply: {
                    select: {
                        product: true,
                        User: {
                            select: {
                                Company: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                            }
                        },
                        warehouse: true,
                        quantity: true,
                        price: true,
                        production_date: true,
                        expiration_date: true,
                        Supply_Transporter: {
                            select: {
                                User: {
                                    select: {
                                        Company: {
                                            select: {
                                                id: true,
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        Supply_History: true
                    }
                }
                },
        })
    } catch (e){
        console.log(e)
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

    // Product Functions
    getAllProducts,
    getProductByID
}