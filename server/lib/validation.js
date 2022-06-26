/*  Greenly Validation Library
    Functions included pertain to data validation, filtering and type-safety.
*/

/* Parameter Validation Package */
const { body, param, query, validationResult, matchedData } = require('express-validator');
const { checkUserConflict, getUserByID, getAllCategories } = require('./persistence');
const bcrypt = require('bcrypt');

/* User Validation Functions */

function createUserValidator() {
    return[
        body('first_name')
            .notEmpty()
            .isString(),
        body('last_name')
            .notEmpty()
            .isString(),
        body('email')
            .isEmail()
            .toLowerCase()
            .custom(value => {
                return checkUserConflict("email", value).then(conflict => {
                    if (conflict) {
                        return Promise.reject("E-mail already in use.")
                    }
                })
            }),
        body('password')
            .isLength({min: 5}),
        body('type')
            .isIn(["ADMINISTRATOR", "SUPPLIER", "TRANSPORTER", "CONSUMER"]),
        body('phone')
            .optional()
            .notEmpty()
            .isString(),
        body('company.name')
            .if(body('type')
                .isIn(["SUPPLIER", "TRANSPORTER"]))
            .exists()
            .withMessage("Company name must be included if user type is supplier or transporter.").bail()
            .notEmpty()
            .isString(),
        body('company.bio')
            .optional()
            .notEmpty()
            .isString(),
        body('company.email')
            .if(body('type')
                .isIn(["SUPPLIER", "TRANSPORTER"]))
            .exists()
            .withMessage("Company email must be included if user type is supplier or transporter.").bail()
            .isEmail(),
        
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // If any error is related to conflict, status code should be 409, not 422
                if (Object.values(errors.array()).some(x => x.msg.includes("in use"))) {
                    res.statusCode = 409
                } else {
                    res.statusCode = 422
                }
                return res.json({errors: errors.array()});
            }
            next();
            },

    ]
}

function updateUserValidator() {
    return [
        param('userId').isInt().toInt().custom(value => {
                    return getUserByID(value).then(user => {
                        if (!user) {
                            return Promise.reject(`User with ID ${value} doesn't exist.`)
                        }
                        })
                    }),

        body('first_name')
            .optional()
            .isString(),

        body('last_name')
            .optional()
            .notEmpty(),

        body('email')
            .isEmail()
            .optional()
            .toLowerCase()
            .custom(value => {
                return checkUserConflict("email", value).then(conflict => {
                    if (conflict) {
                        return Promise.reject("E-mail already in use.")
                    }
                })
            }),
        body('phone')
            .optional()
            .notEmpty()
            .isString(),
        body('old_password') // Require new_password if old_password is included.
            .if(body("new_password").exists()).notEmpty().withMessage("new_password and old_password both have to be included.")
            .custom( (old_password, { req }) => {
                return user = getUserByID(req.params.userId, true).then((user) => { 
                    if (user.Credentials.provider != "local") {
                        return Promise.reject("Password changing is only available to locally registered users (i.e. non-Google/Facebook).")
                    }
                    return true;
                })
            })
            .custom( (old_password, { req }) => {
                // Check if old_password matches current user password using bcrypt.compareSync
                return user = getUserByID(req.params.userId, true).then((user) => {
                    if (!bcrypt.compareSync(old_password, user.Credentials.value)) {
                        return Promise.reject("old_password doesn't match user password.")
                    }
                    return true
                })
            }),

        body('new_password') // Require old_password if new_password is included.
            .if(body("old_password").exists()).notEmpty().withMessage("new_password and old_password both have to be included.")
            .isLength({min: 5})
            .withMessage("Minimum password length is 5.").bail()
            .custom((new_password, {req}) => {
                if (req.body.old_password == new_password) {
                    return Promise.reject("old_password can't be the same as new_password")
                } else {
                    return true
                }
            }),
        body('type')
            .optional()
            .isIn(["ADMINISTRATOR", "SUPPLIER", "TRANSPORTER", "CONSUMER"]),
        body('company.bio')
            .optional()
            // If it exists and the user isn't supplier or transport
            .custom((value, {req}) => {
                return ["SUPPLIER", "TRANSPORTER"].includes(req.user.type)
            })
            .withMessage("Company information can't be included if user is a consumer.").bail()
            .notEmpty()
            .isString(),
        body('company.name')
            .optional()
            .custom((value, {req}) => {
                return ["SUPPLIER", "TRANSPORTER"].includes(req.user.type)
            })
            .withMessage("Company information can't be included if user is a consumer.").bail()
            .notEmpty()
            .isString(),
        body('company.email')
            .optional()
            .custom((value, {req}) => {
                return ["SUPPLIER", "TRANSPORTER"].includes(req.user.type)
            })
            .withMessage("Company information can't be included if user is a consumer.").bail()
            .isEmail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                // Besides server error, this would only fail for conclict reasons, therefore status code 409
                return res.status(409).json({errors: errors.array()});
            next();
            },

    ]
}

/* Address Validation Functions */

function createAddressValidator() {
    return [
        body("street")
            .notEmpty()
            .isString(),
        body("country")
            .notEmpty()
            .isString(),
        body("city")
            .notEmpty()
            .isString(),
        body("postal_code")
            .notEmpty()
            .isString(),
        body('nif')
            .isLength({min: 9, max:9})
            .isInt()
            .toInt(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateAddressValidator() {
    return [
        body("street")
            .optional()
            .notEmpty()
            .isString(),
        body("country")
            .optional()
            .notEmpty()
            .isString(),
        body("city")
            .optional()
            .notEmpty()
            .isString(),
        body("postal_code")
            .optional()
            .notEmpty()
            .isString(),
        body('nif')
            .optional()
            .isLength({min: 9, max:9})
            .isInt()
            .toInt(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}


/* Product Validation Functions */

function getProductsValidator() {
    return [
        query("sort")
            .optional()
            .isIn(["newest", "oldest", "price_asc", "price_desc", "name_asc", "name_desc"]),
        query("limit")
            .optional()
            .isInt({min: 0, max: 250})
            .toInt(),
        query("page")
            .optional()
            .isInt({min:1})
            .toInt(),
        query("category")
            .optional()
            .isInt()
            .toInt(),
        query("keywords.*")
            .optional()
            .notEmpty()
            .isString(),
        query("min_price")
            .optional()
            .isFloat({min: 0})
            .toFloat()
            .notEmpty()
            .custom((value, {req}) => {
                if (req.query.max_price) {
                    return value < req.query.max_price
                }
                return true;
            })
            .withMessage("Minimum price has to be lower than maximum price.").bail(),
        query("max_price")
            .optional()
            .isFloat({min: 0})
            .toFloat()
            .notEmpty()
            .custom((value, {req}) => {
                if (req.query.min_price) {
                    return value > req.query.min_price
                }
                return true;
            })
            .withMessage("Maximum price has to be higher than minimum price.").bail(),
        query("supplier")
            .optional()
            .notEmpty()
            .isInt({min: 1})
            .toInt(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

/* Category Validation Functions */


function createCategoryValidator() {
    return [
        body("name")
            .notEmpty()
            .isString(),
        body("parent_category")
            .optional()
            .toInt()
            .custom(async value => {
                let currentCategories = await getAllCategories();

                // If the parent_category isn't valid
        
                if (!currentCategories.map((category) => category.id).includes(value)) {
                    return Promise.reject("Invalid parent category.");
                }

                return true;
            }),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateCategoryValidator() {
    return [
        body("name")
            .optional()
            .notEmpty()
            .isString(),
        body("parent_category")
            .optional()
            .notEmpty()
            .toInt()
            .custom(async value => {
                let currentCategories = await getAllCategories();

                // If the parent_category isn't valid
        
                if (!currentCategories.map((category) => category.id).includes(value)) {
                    return Promise.reject("Parent category not found.");
                }

                return true;
            }),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

/* Login Validation */

function loginValidator() {
    return [
        body("email")
            .notEmpty()
            .isEmail()
            .withMessage("A valid e-mail is required for login."),
        body("password")
            .notEmpty()
            .withMessage("Password is required for login."),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function addToCartValidator() {
    return [
        body("product")
            .notEmpty()
            .bail()
            .isInt()
            .toInt(),
        body("supplier")
            .notEmpty()
            .bail()
            .isInt()
            .toInt(),
        body("warehouse")
            .notEmpty()
            .bail()
            .isInt()
            .toInt(),
        body("transporter")
            .notEmpty()
            .bail()
            .isInt()
            .toInt(),
        body("quantity")
            .notEmpty()
            .bail()
            .isInt()
            .toInt()
            .isInt({min:1})
            .withMessage("Minimum quantity is 1."),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateCartItemValidator() {
    return [
        body("quantity")
            .notEmpty()
            .bail()
            .isInt()
            .toInt()
            .isInt({min:1})
            .withMessage("Minimum quantity is 1."),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function addProductToWishlistValidator() {
    return [
        body("product")
            .notEmpty()
            .bail()
            .isInt()
            .toInt(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function createOrderValidator() {
    return [
        body("shipping_address")
            .notEmpty()
            .isInt()
            .toInt(),
        body("billing_address")
            .notEmpty()
            .isInt()
            .toInt(),
        body("observations")
            .optional()
            .isString().isLength({ max: 255 }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function getSingleOrderValidator() {
    return [
        param('orderId').isInt().toInt(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateOrderValidator() {
    return [
        param('orderId').isInt().toInt(),
        param('itemId').isInt().toInt(),
        body("status")
            .notEmpty()
            .isString()
            .isIn(["CANCELED", "AWAITING_TRANSPORT", "TRANSPORT_IMMINENT",  "FAILURE", "IN_TRANSIT", "LAST_MILE", "COMPLETE"])
            .withMessage("Invalid target status."),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

/* Warehouse Validators */

function createWarehouseValidator() {
    return [
        body('address')
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('capacity')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('resource_usage')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('renewable_resources')
            .notEmpty().bail()
            .isInt({min: 0}).bail()
            .toInt(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateWarehouseValidator() {
    return [
        body('address')
            .optional()
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('capacity')
            .optional()
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('resource_usage')
            .optional()
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('renewable_resources')
            .optional()
            .notEmpty().bail()
            .isInt({min: 0}).bail()
            .toInt(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

/* Distribution Center Validators */

function createDistributionCenterValidator() {
    return [
        body('address')
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('capacity')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateDistributionCenterValidator() {
    return [
        body('address')
            .optional()
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('capacity')
            .optional()
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function createVehicleValidator() {
    return [
        body('distribution_center')
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('license_plate')
            .notEmpty().bail()
            .isString().bail()
            .isLength({min: 6, max:6})
            .toUpperCase(),
        body('payload_capacity')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('resource_usage')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('average_emissions')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('fuel_type')
            .isIn(["PETROL", "DIESEL", "ELECTRICITY"])
            .withMessage("Invalid fuel type. Values can be: PETROL, DIESEL; ELECTRICITY"),


        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateVehicleValidator() {
    return [
        body('distribution_center')
            .optional()
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('license_plate')
            .optional()
            .notEmpty().bail()
            .isString().bail()
            .isLength({min: 6, max:6})
            .toUpperCase(),
        body('payload_capacity')
            .optional()
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('resource_usage')
            .optional()
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('average_emissions')
            .optional()
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('fuel_type')
            .optional()
            .isIn(["PETROL", "DIESEL", "ELECTRICITY"])
            .withMessage("Invalid fuel type. Values can be: PETROL, DIESEL; ELECTRICITY"),


        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function getInventoryValidator() {
    return [
        query("sort")
            .optional()
            .isIn(["newest", "oldest", "price_asc", "price_desc"]),
        query("warehouse")
            .optional()
            .isInt()
            .toInt(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function createSupplyValidator() {
    return [
        body('product')
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('warehouse')
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('quantity')
            .notEmpty().bail()
            .isInt({min: 1}).bail()
            .toInt(),
        body('price')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('production_date')
            .notEmpty().bail()
            .isISO8601()
            .withMessage("Invalid datetime format. All date inputs should follow the ISO8601 format (YYYY-MM-DD).").bail(),
        body('expiration_date')
            .notEmpty().bail()
            .withMessage("Invalid datetime format. All date inputs should follow the ISO8601 format (YYYY-MM-DD).").bail()
            .custom(value => {
                
                let providedDate = new Date(value)

                if (isNaN(providedDate)) {
                    return Promise.reject("Invalid datetime format. All date inputs should follow the ISO8601 format (YYYY-MM-DD).")
                }
                
                if (new Date() > providedDate) {
                    return Promise.reject("Specified expiration dates should be in the future.")
                }

                return true
            }),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateSupplyValidator() {
    return [
        body('quantity')
            .optional()
            .notEmpty().bail()
            .isInt({min: 1}).bail()
            .toInt(),
        body('price')
            .optional()
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),
        body('production_date')
            .optional()
            .notEmpty().bail()
            .isISO8601()
            .withMessage("Invalid datetime format. All date inputs should follow the ISO8601 format (YYYY-MM-DD).").bail(),
        body('expiration_date')
            .optional()
            .notEmpty().bail()
            .withMessage("Invalid datetime format. All date inputs should follow the ISO8601 format (YYYY-MM-DD).").bail()
            .custom(value => {
                
                let providedDate = new Date(value)

                if (isNaN(providedDate)) {
                    return Promise.reject("Invalid datetime format. All date inputs should follow the ISO8601 format (YYYY-MM-DD).")
                }
                
                if (new Date() > providedDate) {
                    return Promise.reject("Specified expiration dates should be in the future.")
                }

                return true
            }),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function createSupplyTransportValidator() {
    return [
        body('transporter')
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('price')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateSupplyTransportValidator() {
    return [
        body('price')
            .notEmpty().bail()
            .isFloat({min: 0}).bail()
            .toFloat(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function createProductValidator() {
    return [
        body('name')
            .notEmpty().bail()
            .isString().bail()
            .isLength({max: 255}),
        body('description')
            .notEmpty().bail()
            .isString().bail()
            .isLength({max:1000}),
        body('category')
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('complement_name')
            .optional()
            .notEmpty().bail()
            .isString().bail()
            .isLength({max: 50}),
        body('complement_quantity')
            .optional()
            .notEmpty().bail()
            .isInt({min: 1}).bail()
            .toInt(),
        body('attributes')
            .optional()
            .isArray().withMessage("Attributes must be an array of attributes.")
            .custom((attributes) => {

                let isValid = true
                
                for (let i = 0; i < attributes.length && isValid; i++) {

                    let attribute = attributes[i]

                    isValid = 
                        (attribute.hasOwnProperty("title") && attribute.hasOwnProperty("content")) &&

                        (typeof attribute.title === 'string' && typeof attribute.content === 'string') &&

                        (attribute.title.length <= 50 && attribute.content.length <= 255)
                    
                }

                if (!isValid) {
                    return Promise.reject("All attributes must contain a 'title' property under 50 characters and a 'content' property under 255 characters.")
                }

                return true
            }),
        
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function updateProductValidator() {
    return [
        body('name')
            .optional()
            .notEmpty().bail()
            .isString().bail()
            .isLength({max: 255}),
        body('description')
            .optional()
            .notEmpty().bail()
            .isString().bail()
            .isLength({max:1000}),
        body('category')
            .optional()
            .notEmpty().bail()
            .isInt().bail()
            .toInt(),
        body('complement_name')
            .optional()
            .notEmpty().bail()
            .isString().bail()
            .isLength({max: 50}),
        body('complement_quantity')
            .optional()
            .notEmpty().bail()
            .isInt({min: 1}).bail()
            .toInt(),
        
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

function createProductAttributeValidator() {
    return [
            body('title')
                .notEmpty().bail()
                .isString().bail()
                .isLength({max: 50}),
            body('content')
                .notEmpty().bail()
                .isString().bail()
                .isLength({max:255}),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty())
                    return res.status(400).json({errors: errors.array()});
                next();
                },
        ]
}

function updateProductImageValidator() {
    return [
        body('new_position')
            .notEmpty().bail()
            .isInt({min: 1}).withMessage("Position must be a 1-based index.").bail()
            .toInt(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

module.exports = {
    // User validators
    createUserValidator,
    updateUserValidator,

    // Address validators
    createAddressValidator,
    updateAddressValidator,

    // Authentication validators
    loginValidator,

    // Product validators
    getProductsValidator,
    createProductValidator,
    updateProductValidator,
    createProductAttributeValidator,
    updateProductImageValidator,

    // Category validators,
    createCategoryValidator,
    updateCategoryValidator,

    // Cart validators
    addToCartValidator,
    updateCartItemValidator,

    // Wishlist validators
    addProductToWishlistValidator,

    // Order validators
    createOrderValidator,
    getSingleOrderValidator,
    updateOrderValidator,

    // Warehouse validators
    createWarehouseValidator,
    updateWarehouseValidator,

    // Distribution Center Validators
    createDistributionCenterValidator,
    updateDistributionCenterValidator,

    // Vehicle Validators
    createVehicleValidator,
    updateVehicleValidator,

    // Inventory Validators
    getInventoryValidator,
    createSupplyValidator,
    updateSupplyValidator,
    createSupplyTransportValidator,
    updateSupplyTransportValidator

}