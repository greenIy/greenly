/* Parameter Validation Package */
const { body, validationResult, param, query } = require('express-validator');
const { checkUserConflict, getUserByID } = require('./persistence');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* User Validation Functions */

function createUserValidator() {
    // TODO: Don't forget to proof this (try/catch/detail exception) during database access
    return[
        body('firstName')
            .notEmpty()
            .isString(),
        body('lastName')
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
        body('phone')
            .notEmpty()
            .isString(),
        body('password')
            .isLength({min: 5}),
        body('nif')
            .isLength({min: 9, max:9})
            .isInt()
            .custom(value => {
                return checkUserConflict("nif", value).then(conflict => {
                    if (conflict) {
                        return Promise.reject("NIF already in use.")
                    }
                })
            }),
        body('type')
            .isIn(["ADMINISTRATOR", "SUPPLIER", "TRANSPORTER", "CONSUMER"]),
        body('address.street')
            .notEmpty()
            .isString(),
        body('address.country')
            .notEmpty()
            .isString(),
        body('address.postalCode')
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
            .if(body('type')
                .isIn(["SUPPLIER", "TRANSPORTER"]))
            .exists()
            .withMessage("Company bio must be included if user type is supplier or transporter.").bail()
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
    // TODO: Don't forget to proof this (try/catch/detail exception) during database access
    // TODO: When dealing with authentication, this will have to be proofed.
    //       Only the user itself or an admin could use this, and only to edit the user in question.
    return [
        param('userId').toInt().custom(value => {
                    return getUserByID(value).then(user => {
                        if (!user) {
                            return Promise.reject(`User with ID ${value} doesn't exist.`)
                        }
                        })
                    }),

        body('firstName')
            .optional()
            .isString(),

        body('lastName')
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
            .notEmpty(),

        body('oldPassword') // Require newPassword if oldPassword is included.
            .if(body("newPassword").exists()).notEmpty().withMessage("newPassword and oldPassword both have to be included.")
            .custom( (oldPassword, { req }) => {
                // Check if oldPassword matches current user password using bcrypt.compareSync
                return user = getUserByID(req.params.userId, true).then((user) => {

                    if (!bcrypt.compareSync(oldPassword, user.password)) {
                        return Promise.reject("oldPassword doesn't match user password.")
                    }
                })
            }),

        body('newPassword') // Require oldPassword if newPassword is included.
            .if(body("oldPassword").exists()).notEmpty().withMessage("newPassword and oldPassword both have to be included.")
            .isLength({min: 5})
            .withMessage("Minimum password length is 5."),

        body('nif')
            .optional()
            .isLength({min: 9, max:9})
            .custom(value => {
                return checkUserConflict("nif", value).then(conflict => {
                    if (conflict) {
                        return Promise.reject("NIF already in use.")
                    }
                })
            }),

        body('type')
            .optional()
            .isIn(["ADMINISTRATOR", "SUPPLIER", "TRANSPORTER", "CONSUMER"]),
        body('address.street')
            .optional()
            .notEmpty(),

        body('address.country')
            .optional()
            .notEmpty(),

        body('address.postalCode')
            .optional()
            .notEmpty(),
            
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                // Besides server error, this would only fail for conclict reasons, therefore status code 409
                return res.status(409).json({errors: errors.array()});
            next();
            },

    ]
}

/* Product Validation Functions */

function getProductsValidator() {
    return [
        query("sort")
            .optional()
            .isIn(["price_asc", "price_desc"]),
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
            .isString(),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({errors: errors.array()});
            next();
            },
    ]
}

module.exports = {
    createUserValidator,
    updateUserValidator,
    getProductsValidator
}