/* Keep in mind, the path for each route in this file is prepended with /store */

const express   = require('express');
const router    = express.Router();

/* Greenly libraries */
const { getProductsValidator } = require('../lib/validation.js');
const persistence   = require('../lib/persistence.js')
const defaultErr    = require("../lib/error").defaultErr

/* Product Routes */

/* GET /store/products */

router.get('/product', getProductsValidator(), (req, res) => {
    try {
        persistence.getAllProducts(req.query.limit, req.query.page, req.query.category, req.query.keywords).then((products) => {

            if (products) {
                for (let i = 0; i < products.length; i++) {
                    // Renaming Category key -> category
                    delete Object.assign(products[i], {["category"]: products[i]["Category"] })["Category"];

                    // Calculating lowest and highest price
                    if (products[i].Supply.length > 1) {

                        products[i]["lowest_price"] = products[i].Supply.reduce((a, b) => Math.min(a.price, b.price))

                        products[i]["highest_price"] = products[i].Supply.reduce((a, b) => Math.max(a.price, b.price))


                    } else if (products[i].Supply.length == 1) {

                        // This is a workaround for when there's
                        // only one Supply. Because array.reduce
                        // works differently when there's only
                        // one element in an array.
                        products[i]["lowest_price"] = products[i]["highest_price"] = Number(products[i].Supply[0].price);
                    }

                    // Removing unrequired keys
                    delete products[i].Supply
                }

                // Sorting: has to be done here since Prisma does
                // not support sorting over calculated attributes  
                // such  as lowest_price)
                if (req.query.sort == "price_asc") {
                    products.sort((a, b) => a.lowest_price - b.lowest_price)

                } else if (req.query.sort == "price_desc") {
                    products.sort((a, b) => b.lowest_price - a.lowest_price)
                }
            
            }

            res.status(200).json(products)
        })
    } 
    catch {
        res.status(500).send(defaultErr());
    }}
)


/* GET /store/products/{productId} */

router.get('/product/:productId', (req, res) => {
    /* This function may seem rather confusing. It's purpose is to not 
       not only provide a decent REST API structure, but to obfuscate database structure, as it shouldn't be mirrored by the API */
    
    try {
        persistence.getProductByID(Number(req.params.productId)).then((product) => {
            if (product) {
                // Renaming Category key
                delete Object.assign(product, {["category"]: product["Category"] })["Category"];


                // Renaming Supply key (Prisma limitation)
                delete Object.assign(product, {["supplies"]: product["Supply"] })["Supply"];

                /* TODO: WARNING: THIS RETURNS SUPPLIER AND TRANSPORTER COMPANY IDs, 
                        AND NOT USER IDs, WHICH IS WHAT'S REQUIRED TO CREATE ORDERS. 
                        WILL HAVE TO BE CHANGED UNLESS DATABASE STRUCTURE CHANGES TO 
                        ACCOMODATE SUPPLIERS AND TRANSPORTERS AS COMPANIES INSTEAD OF USERS */
                for (let i = 0; i<product.supplies.length; i++) {

                    // Renaming Supplies>User>Company>Name to "supplier"
                    // Supplier is always present
                    delete Object.assign(product.supplies[i], {["supplier"]: product.supplies[i].User.Company}).User

                    // Renaming Supply_Transporter to transporters
                    delete Object.assign(product.supplies[i], {["transporters"]: product.supplies[i].Supply_Transporter}).Supply_Transporter

                    // Rearranging transporter details

                    for (let j = 0; j < product.supplies[i].transporters.length; j++) {

                        // Old version: useful if you want to change from getting company ID to eventually getting the userID
                        // delete Object.assign(product.supplies[i].transporters[j], {["name"]: product.supplies[i].transporters[j].User.Company.name}).User

                        delete Object.assign(product.supplies[i].transporters[j], product.supplies[i].transporters[j].User.Company).User
                    }

                    // Renaming supply history details
                    delete Object.assign(product.supplies[i], {["history"]: product.supplies[i].Supply_History}).Supply_History
                }

                res.status(200).json(product)
            } else {
                res.status(404).send({message: "Product not found."})
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).send(defaultErr());
    }
})


module.exports = router;