/*  Greenly Persistence Library
    Functions included pertain to database access and manipulation.
*/

const { PrismaClient } = require('@prisma/client');
const {Client} = require("@googlemaps/google-maps-services-js");
const bcrypt = import('bcrypt');

// Use 10 salt rounds for each hash
const saltRounds = 10;

const prisma = new PrismaClient();
const maps = new Client();

/* User Functions */

/* Returns user object on creation */
async function createUser(name, email, password, type, street, country, city, postal_code) {

    // API Call: Disabled for testing (works)
    // const geocoded = await maps.geocode({
    //     params: {
    //         address: `${street}, ${city}, ${country}`,
    //         key: process.env.GOOGLE_API_KEY
    //     }
    // })

    const newAddress = await prisma.address.create({
        data: {
            street: street,
            country: country,
            city: city,
            // Using dummy values for testing. Use this for API call:
            // geocoded.data.results[0].geometry.location.lat
            // geocoded.data.results[0].geometry.location.lng
            latitude: 0,
            longitude: 0,
            postal_code: postal_code
        }
    })

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            address: newAddress.id,
            password: (await bcrypt).hashSync(password, saltRounds),
            type: type
        }
    })

    return newUser;
}

async function getUserByID(id) {
    return user = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            Address: true
        }
    })
}

/* All functions to be made available to the rest of the project should be listed here */

module.exports = {
    createUser,
    getUserByID
}

// Test Lines

createUser("zeval", "contact@zeval.pt", "password", "ADMINISTRATOR", "Rua Do Quelhas", "Portugal", "City","")