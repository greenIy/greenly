/* Keep in mind, the path for each route in this file is prepended with /store */

const express   = require('express');
const router    = express.Router();
const Multer    = require('multer');

// Initializing Multer for receiving files (max 5MB)
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
});

/* Greenly libraries */
const { 
    getProductsValidator,
    createCategoryValidator,              
    updateCategoryValidator,
    getSingleOrderValidator,
    updateOrderValidator, 
    createProductValidator,
    updateProductValidator,
    createProductAttributeValidator,
    updateProductImageValidator} = require('../lib/validation.js');
const persistence       = require('../lib/persistence.js');
const payment           = require("../lib/payment")
const authentication    = require("../lib/authentication");
const authorization     = require("../lib/authorization");
const handler           = require("../lib/handler")
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
            {min: req.query.min_price, max: req.query.max_price},
            req.query.supplier).
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
    catch (e) {
        console.log(e)
        res.status(500).send(defaultErr());
    }}
)


/* GET /store/product/{productId} */

router.get('/products/:productId', (req, res) => {
    /* This function may seem rather confusing. Its purpose is to not 
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

router.post('/products', authentication.check, authorization.check, createProductValidator(), (req, res) => {
    
    persistence.createProduct(
        req.body.name,
        req.body.description,
        Number(req.body.category),
        req.body.complement_name,
        Number(req.body.complement_quantity),
        req.body.attributes
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_CATEGORY":
                return res.status(404).send({
                    message: "Invalid category. Make sure to specify a category registered on the website."
                })
            default:
                return res.status(201).json({
                    id: result
                })
            }
    })

})

router.put(
    '/products/:productId', 
    authentication.check, 
    authorization.check, 
    updateProductValidator(), 
    (req, res) => {

        persistence.updateProduct(
            Number(req.params.productId),
            req.body
        ).then((result) => {

            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_PRODUCT":
                    return res.status(404).send({message: "Product not found. Make sure to specify a product currently registered on the website."})
                case "INVALID_CATEGORY":
                    return res.status(404).send({
                        message: "Invalid category. Make sure to specify a category registered on the website."
                    })
                default:
                    return res.status(200).json({message: "Successfully updated product details."})
            }

        })

})

router.delete(
    '/products/:productId',
    authentication.check,
    authorization.check,
    (req, res) => {
        persistence.deleteProduct(
            Number(req.params.productId)
        ).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_PRODUCT":
                    return res.status(404).send({message: "Product not found. Make sure to specify a product currently registered on the website."})
                default:
                    return res.status(200).send({message: "Successfully deleted product, along with all corresponding images, supplies and transportation rules."})
            }
        })
    }
)

/* Product Attribute Routes */

router.post(
    '/products/:productId/attributes', 
    authentication.check, 
    authorization.check, 
    createProductAttributeValidator(), 
    (req, res) => {
    
        persistence.createProductAttribute(
            Number(req.params.productId),
            req.body.title,
            req.body.content
        ).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_PRODUCT":
                    return res.status(404).send({message: "Product not found. Make sure to specify a product currently registered on the website."})
                default:
                    return res.status(201).json({
                        id: result
                    })
                }
        })

})

router.delete(
    '/products/:productId/attributes/:attributeId',
    authentication.check,
    authorization.check,
    (req, res) => {

        persistence.deleteProductAttribute(
            Number(req.params.productId),
            Number(req.params.attributeId)
        ).then((result) => {

            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_PRODUCT":
                    return res.status(404).send({message: "Product not found. Make sure to specify a product currently registered on the website."})
                case "INVALID_ATTRIBUTE":
                    return res.status(404).send({message: "Attribute not found. Make sure to specify an attribute related to the specified product."})
                default:
                    return res.status(200).send({message: "Successfully deleted product attribute."})
            }
        })
    }
)

/* Product Image Routes */

router.post(
    '/products/:productId/images',
    authentication.check,
    authorization.check,
    multer.single("upload"),
    (req, res) => {

        persistence.addProductImages(
            Number(req.params.productId),
            req.file
        ).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_PRODUCT":
                    return res.status(404).send({message: "Product not found. Make sure to specify a product currently registered on the website."})
                case "NO_FILE":
                    return res.status(400).send({message: "No file has been uploaded. Make sure to upload a valid file."})
                case "INVALID_FILE":
                    return res.status(400).send({message: "Specified file is invalid. Make sure to provide a file under 5MB (supported filetypes: PNG, JPG and JPEG)."})
                default:
                    return res.status(201).json(result)
                }
        })

    }
)

router.put(
    '/products/:productId/images/:imageId',
    authentication.check,
    authorization.check,
    updateProductImageValidator(),
    (req, res) => {
        persistence.updateProductImagePosition(
            Number(req.params.productId),
            Number(req.params.imageId),
            Number(req.body.new_position)
        ).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_PRODUCT":
                    return res.status(404).send({message: "Product not found. Make sure to specify a product currently registered on the website."})
                case "INVALID_IMAGE":
                    return res.status(404).send({message: "Image not found. Make sure to specify an image related to the specified product."})
                default:
                    return res.status(200).send({message: "Successfully altered product image position."})
            }
        })
    }
)

router.delete(
    '/products/:productId/images/:imageId',
    authentication.check,
    authorization.check,
    (req, res) => {
        persistence.deleteProductImage(
            Number(req.params.productId),
            Number(req.params.imageId)
        ).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_PRODUCT":
                    return res.status(404).send({message: "Product not found. Make sure to specify a product currently registered on the website."})
                case "INVALID_IMAGE":
                    return res.status(404).send({message: "Image not found. Make sure to specify an image related to the specified product."})
                default:
                    return res.status(200).send({message: "Successfully deleted product image."})
            }
        })
    }
)

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
            return res.status(409).send({message: "Category can't be deleted, includes products or sub-categories."})
        } else if (success) {
            return res.status(202).send({message: "Category deleted successfully."})
        } else {
            return res.status(404).send({message: "Category not found."})
        }
    })
});

/* Supplier information route */
// Any  user can inquire about suppliers registered to the platform
router.get('/suppliers', (req, res) => {
    persistence.getAllSuppliers().then((result) => {
        if (result) {
            return res.status(200).json(result)
        }
        else {
            res.status(500).send(defaultErr())
        }
    })
})

/* Transporter information route */
// Any  user can inquire about transporters registered to the platform
router.get('/transporters', (req, res) => {
    persistence.getAllTransporters().then((result) => {
        if (result) {
            return res.status(200).json(result)
        }
        else {
            res.status(500).send(defaultErr())
        }
    })
})

/* Payment routes */

router.get('/payments/config', authentication.check, (req, res) => {
    // Serving publishable key
    return res.status(200).json({
        publishable_key: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

router.get('/payments/intent/:orderId', authentication.check, (req, res) => {
    
    payment.createPaymentIntent(Number(req.params.orderId))
    .then((result) => {
        
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_ORDER":
                return res.status(400).send({message: "The specified order is invalid."})
            case "INVALID_STATUS":
                return res.status(400).send({message: "The specified order is not available to receive payments."})
            default:
                return res.status(200).send({intent: result})
        }
    })
})

router.post('/payments/webhook', async (req, res) => {

    let event = req.body

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;

            let user = await persistence.getUserByID(
                Number(paymentIntent.metadata.user_id))

            console.log(`💸 Received payment for ${paymentIntent.amount/100}€ from ${user.first_name} ${user.last_name}! (Order ID: ${paymentIntent.metadata.order_id})`);

            await handler.postPaymentHandler(
                Number(paymentIntent.metadata.order_id));

            break;
    }

    return res.status(200).json({received: true})
    
})

/* Order Routes */

router.get('/orders', authentication.check, async (req, res) => {
    persistence.getOrdersByUser(req.user).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            default:
                return res.status(200).json(result)
        }
    })
})

router.get('/orders/:orderId', authentication.check, getSingleOrderValidator(), authorization.check, async (req, res) => {

    persistence.getFilteredOrderByID(req.user, req.params.orderId).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "NOT_FOUND":
                return res.status(404).send({message: "The specified order identifier is invalid."})
            default:
                return res.status(200).json(result)
        }
    })

})

router.put('/orders/:orderId/:itemId', authentication.check, updateOrderValidator(), authorization.check,  async (req, res) => {
    persistence.updateOrderItem(
        req.user, 
        req.params.orderId, 
        req.params.itemId,
        req.body.status).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())

            case "ITEM_NOT_FOUND":
                return res.status(404).send({
                    message: "The specified item identifier is invalid for the specified order."})

            case "AWAITING_PAYMENT":
                return res.status(400).send({
                    message: "You can't change this item's status since this item has not yet been paid for."})

            case "INSUFFICIENT_PERMISSIONS":
                return res.status(400).send({
                    message: "You don't have permission to change the item's status from its current status to the specified status."})

            case "ITEM_CANCELED":
                return res.status(400).send({
                    message: "The status of this order item cannot be changed since it has already been canceled."})

            case "REGRESSIVE_STATUS":
                return res.status(400).send({
                    message: "The specified order item is already passed the specified status. Please specifiy a status ahead of the current status."})
            default:
                return res.status(200).send({
                    message: "Item succesfully updated."
                })
        }
    })
})

module.exports = router;