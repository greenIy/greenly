/* Parameter Validation Package */
const { body, param, query, validationResult, matchedData } = require('express-validator');
const { checkUserConflict, getUserByID, getAllCategories } = require('./persistence');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* User Validation Functions */

function createUserValidator() {
    // TODO: Don't forget to proof this (try/catch/detail exception) during database access
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
                // Check if old_password matches current user password using bcrypt.compareSync
                return user = getUserByID(req.params.userId, true).then((user) => {
                    if (!bcrypt.compareSync(old_password, user.password)) {
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
            .isInt(),

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
            .isInt(),

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
            .isInt({min:1}),
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

module.exports = {
    // User Validators
    createUserValidator,
    updateUserValidator,

    // Address Validators
    createAddressValidator,
    updateAddressValidator,

    // Authentication validators
    loginValidator,

    // Product Validators
    getProductsValidator,

    // Category Validators,
    createCategoryValidator,
    updateCategoryValidator,

}