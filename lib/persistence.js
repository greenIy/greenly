/*  Greenly Persistence Library
    Functions included pertain to database access and manipulation.
*/

const { PrismaClient } = require('@prisma/client');
const bcrypt = import('bcrypt');

// Use 10 salt rounds for each hash
const saltRounds = 10;

const prisma = new PrismaClient();

/* User Functions */

///-----------
// TEST: Extremely rudimentary proof-of-concept for DB interaction.

async function createUser() {

    const newAddress = await prisma.address.create({
        data: {
            address: 'Campo Grande 016',
            country: 'Portugal',
            city: 'City',
            latitude: 38.756525,
            longitude: -9.15538,
            postal_code: "1749-016"
        }
    })

    const newUser = await prisma.user.create({
        data: {
            name: 'Test',
            email: 'Test@email.com',
            address: newAddress.id,
            password: (await bcrypt).hashSync("teste", saltRounds)
        }
    })

    console.log(newUser);

}

createUser();

///-----------

/* All functions to be made available to the rest of the project should be listed here */

module.exports = {
    createUser
}