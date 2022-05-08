/* Keep in mind, the path for each route in this file is prepended with /store */

const express   = require('express');
const router    = express.Router();

/* Greenly libraries */
const { 
    getProductsValidator,
    createCategoryValidator,              
    updateCategoryValidator } = require('../lib/validation.js');
const persistence       = require('../lib/persistence.js');
const authentication    = require("../lib/authentication");
const authorization     = require("../lib/authorization");
const defaultErr        = require("../lib/error").defaultErr;

/* Product Routes */

/* GET /store/products */

router.get('/products', getProductsValidator(), (req, res) => {
    try {
        let productData = persistence.getAllProducts(
            req.query.limit,
            req.query.page,
            req.query.category,
            req.query.keywords,
            req.query.sort,
            {min: req.query.min_price, max: req.query.max_price}).
        then((productData) => {

            if (productData) {

                for (let i = 0; i < productData.products.length; i++) {
                    // Renaming Category key -> category
                    delete Object.assign(productData.products[i], {["category"]: productData.products[i]["Category"] })["Category"];

                    // Removing unrequired keys
                    delete productData.products[i].Supply
                }
            }

            res.status(200).json(productData)
        })
    } 
    catch {
        res.status(500).send(defaultErr());
    }}
)


/* GET /store/product/{productId} */

router.get('/products/:productId', (req, res) => {
    /* This function may seem rather confusing. It's purpose is to not 
       not only provide a decent REST API structure, but to obfuscate database structure, as it shouldn't be mirrored by the API */
    
    try {
        persistence.getProductByID(Number(req.params.productId)).then((product) => {
            if (product) {

                // Renaming Category key
                delete Object.assign(product, {["category"]: product["Category"] })["Category"];

                // Renaming ProductAttributes key
                delete Object.assign(product, {["attributes"]: product["ProductAttribute"] })["ProductAttribute"];

                // Renaming Supply key (Prisma limitation)
                delete Object.assign(product, {["supplies"]: product["Supply"] })["Supply"];


                for (let i = 0; i<product.supplies.length; i++) {

                    // Renaming Supplies>User>Company>Name to "supplier"
                    // Supplier is always present
                    product.supplies[i].supplier = {
                        id: product.supplies[i].User.id,
                        name: product.supplies[i].User.Company ? product.supplies[i].User.Company.name : `${product.supplies[i].User.first_name} ${product.supplies[i].User.last_name}`
                    }

                    delete product.supplies[i].User


                    // Renaming Supply_Transporter to transporters
                    delete Object.assign(product.supplies[i], {["transports"]: product.supplies[i].Supply_Transporter}).Supply_Transporter

                    // Rearranging transporter details

                    for (let j = 0; j < product.supplies[i].transports.length; j++) {

                        let transport = product.supplies[i].transports[j]

                        let transporterId = transport.User.id
                        let transporterName = transport.User.Company ? transport.User.Company.name : `${transport.User.first_name} ${transport.User.last_name}`;
                        let transporterAverageEmissions = transport.average_emissions || 0;
                        let transporterAverageResourceUsage = transport.average_resource_usage || 0;
                        let transportPrice = transport.price

                        let newTransport = {transporter: {
                            id: transporterId,
                            name: transporterName,
                            average_emissions: transporterAverageEmissions,
                            average_resource_usage: transporterAverageResourceUsage,
                            },
                            price: transportPrice}

                        product.supplies[i].transports[j] = newTransport

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
/* Category Routes */

/* GET /store/categories */

router.get('/categories', (req, res) => {
    try {
        persistence.getAllCategories().then((categories) => {
            res.status(200).json(categories)
        })
    } catch {
        res.status(500).send(defaultErr());
    }
});

/* POST /store/categories */
router.post('/categories', authentication.check, authorization.check, createCategoryValidator(), (req, res) => {
    try {
        persistence.createCategory(
            req.body.name,
            req.body.parent_category
        ).then((newCategoryID) => {
            if (newCategoryID) {
                res.status(200).json({id: newCategoryID})
            }
        })
    } catch {
        res.status(500).send(defaultErr());
    }
});

/* PUT /store/categories/:categoryId */

router.put('/categories/:categoryId', authentication.check, authorization.check, updateCategoryValidator(),  (req, res) => {
    try {
        persistence.updateCategory(Number(req.params.categoryId), req.body).then((success) => {
            if (success) {
                res.status(200).send({message: "Category updated successfully."})
            } else {
                res.status(500).send(defaultErr())
            }
        })
    } catch (e) {
        res.status(500).send(defaultErr())
    }
});

/* DELETE /store/categories/:categoryId */

router.delete('/categories/:categoryId', authentication.check, authorization.check, (req, res) => {
    persistence.deleteCategory(Number(req.params.categoryId)).then((success) => {
        if (success == 409) {
            return res.status(409).send({message: "Category can't be deleted, includes products or sub-categories"})
        } else if (success) {
            return res.status(202).send({message: "Category deleted successfully."})
        } else {
            return res.status(404).send({message: "Category not found."})
        }
    })
});

/* Supplier information route */
// Any authenticated user can inquire about suppliers registered to the platform
router.get('/suppliers', authentication.check, (req, res) => {
    persistence.getAllSuppliers().then((result) => {
        if (result) {
            return res.status(200).json(result)
        }
        else {
            res.status(500).send(defaultErr())
        }
    })
})



module.exports = router;