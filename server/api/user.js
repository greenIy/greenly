/* Keep in mind, the path for each route in this file is prepended with /user */

const express = require('express');
const router = express.Router();

/* Greenly libraries & required server data */
const authentication    = require("../lib/authentication")
const authorization     = require("../lib/authorization")
const persistence       = require('../lib/persistence');
const defaultErr        = require("../lib/error").defaultErr
const { 
    createUserValidator, 
    updateUserValidator, 
    createAddressValidator, 
    updateAddressValidator,
    addToCartValidator, 
    updateCartItemValidator,
    addProductToWishlistValidator,
    createOrderValidator
} = require('../lib/validation.js');


/* GET /user (Admin only) */

router.get('/', authentication.check, authorization.check, (req, res) => {
    try {
        persistence.getAllUsers().then((users) => {
            res.status(200).json(users)
        })
    } 
    catch {
        res.status(500).send(defaultErr());
    }}
)


/* POST /user */
// This route only requires an authorization.check when it comes to creating new administrators
router.post('/', authorization.check, createUserValidator(), (req, res) => {
            
    try {
        persistence.createUser(req.body)
            .then((result) => {
                if (result) {
                    res.status(201).json(result);
                }
                else {
                    res.status(500).send(defaultErr());
                }
            })
    } catch (e) {
        console.log(e)
        res.status(400).send({message: "Invalid data. Make sure to include every field."});
    }
})

/* GET /user/{userId} (User, Admin or Transporter only) */

router.get('/:userId', authentication.check, authorization.check, (req, res, next) => {
    
    try {
        //TODO: With authentication and authorization in place, this DB call could be replaced with req.user
        persistence.getUserByID(Number(req.params.userId)).then((user) => {
            if (user) {

                // Renaming Address key (Prisma limitation)
                delete Object.assign(user, {["addresses"]: user["Address"] })["Address"];
                
                // Renaming or removing Company key. Company should only be displayed if
                // user is either supplier or transporter.
                if (["SUPPLIER", "TRANSPORTER"].includes(user.type)) {
                    Object.assign(user, {["company"]: user["Company"]});
                }

                // Renaming credentials key
                user.account_provider = user.Credentials.provider
                
                delete user.Credentials

                delete user.Company

                res.status(200).json(user)
            } else {
                res.status(404).send({message: "User not found."})
            }
        })
    }
    catch {
        res.status(500).send(defaultErr());
    }
})

/* PUT /user/{userId} (User or Admin only) */

router.put('/:userId', authentication.check, authorization.check, updateUserValidator(), (req, res) => {

    try {
        persistence.updateUser(req.params.userId, req.body).then((success) => {
            if (success) {
                res.status(200).send({message: "User updated successfully."})
            } else {
                res.status(500).send(defaultErr())
            }
        })
    } catch {
        res.status(500).send(defaultErr())
    }
    
})

/* DELETE /user/{userId} (User or Admin only) */

// TODO: This has to be proofed against FK constraints (i.e. delete all of the user's things)

router.delete('/:userId', authentication.check, authorization.check, (req, res) => {

    try {
        persistence.deleteUser(Number(req.params.userId)).then((success) => {
            if (success) {
                res.status(202).send({message: "User deleted successfully."})
            } else {
                res.status(404).send({message: "User not found."})
            }
        })
        
    } catch {
        res.status(500).send(defaultErr())
    }
})


/* Address routes */

router.post('/:userId/addresses', authentication.check, authorization.check, createAddressValidator(), (req, res) => {
    try {
        persistence.createAddress(Number(req.params.userId),
                                  req.body.street,
                                  req.body.city,
                                  req.body.country,
                                  req.body.postal_code,
                                  req.body.nif)
            .then((result) => {
                if (result) {
                    res.status(201).json(result);
                }
                else {
                    res.status(500).send(defaultErr());
                }
            })
    } catch (e) {
        console.log(e)
        res.status(400).send({message: "Invalid data. Make sure to include every field."});
    }
})

router.put('/:userId/addresses/:addressId', authentication.check, authorization.check, updateAddressValidator(), (req, res) => {
    try {
        persistence.updateAddress(Number(req.params.userId), Number(req.params.addressId), req.body).then((success) => {
            if (success) {
                res.status(200).send({message: "Address updated successfully."})
            } else {
                res.status(500).send(defaultErr())
            }
        })
    } catch {
        res.status(500).send(defaultErr())
    }

})

router.delete('/:userId/addresses/:addressId', authentication.check, authorization.check, (req, res) => {
    try {
        persistence.deleteAddress(
            Number(req.params.userId),
            Number(req.params.addressId)
            ).then((success) => {
            if (success) {
                res.status(202).send({message: "Address deleted successfully."})
            } else {
                res.status(404).send({message: "Address not found."})
            }
        })
        
    } catch {
        res.status(500).send(defaultErr())
    }
})


/* Cart routes */

router.get('/:userId/cart', authentication.check, authorization.check, (req, res) => {
    try {
        persistence.getCart(Number(req.params.userId)).then((result) => {
            return res.status(200).json(result)
        })

    } catch {
        return res.status(500).send(defaultErr())
    }
})

router.post('/:userId/cart', authentication.check, authorization.check, addToCartValidator(), (req, res) => {
    persistence.addItemToCart(
        req.params.userId, 
        req.body.product, 
        req.body.supplier, 
        req.body.warehouse, 
        req.body.transporter, 
        req.body.quantity,
    ).then((result) => {        
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "NO_STOCK":
                return res.status(400).send({message: "Requested quantity is higher than available stock."})
            case "INVALID_COMBINATION":
                return res.status(400).send({message: "Invalid combination of product, supplier and transporter."})
            case "ALREADY_PRESENT":
                return res.status(409).send({message: "Specified item is already in cart."})
            default:
                return res.status(200).send({message: "Item successfully added to cart."})
        }
    })

})

router.delete('/:userId/cart', authentication.check, authorization.check, (req, res) => {
    persistence.clearCart(req.params.userId).then((success) => {
        if (success) {
            return res.status(200).send({message: "Cart cleared successfully."})
        } else {
            return res.status(500).send(defaultErr())
        }
    })
})

router.put('/:userId/cart/:index', authentication.check, authorization.check, updateCartItemValidator(), (req, res) => {
    persistence.updateCartItem(
        req.params.userId, 
        req.params.index,
        req.body.quantity).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "NO_STOCK":
                    return res.status(400).send({message: "Requested quantity is higher than available stock."})
                case "INVALID_INDEX":
                    return res.status(404).send({message: "Specified index is not valid. Check the content of your cart for updated indexes."})
                default:
                    return res.status(200).send({message: "Item quantity successfully updated."})
            }
        })
})

router.delete('/:userId/cart/:index', authentication.check, authorization.check, (req, res) => {
    persistence.removeCartItem(
        req.params.userId, 
        req.params.index).then((result) => {

            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_INDEX":
                    return res.status(404).send({message: "Specified index is not valid. Check the content of your cart."})
                default:
                    return res.status(200).send({message: "Item successfully removed from cart."})
            }
        })
})


/* Wishlist Routes */

router.get('/:userId/wishlist', authentication.check, authorization.check, (req, res) => {
    try {
        persistence.getWishlist(Number(req.params.userId)).then((result) => {
            return res.status(200).json(result)
        })
    } catch {
        return res.status(500).send(defaultErr())
    }
})

router.post('/:userId/wishlist', authentication.check, authorization.check, addProductToWishlistValidator(), (req, res) => {
    persistence.addProductToWishlist(
        Number(req.params.userId),
        Number(req.body.product)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "ALREADY_PRESENT":
                return res.status(409).send({message: "Specified product is already in wishlist."})
            case "INVALID_PRODUCT":
                return res.status(404).send({message: "The specified product does not exist."})
            default:
                return res.status(201).send({message: "Product successfully added to wishlist."})
        }
    })
})

router.delete('/:userId/wishlist', authentication.check, authorization.check, (req, res) => {
    persistence.clearWishlist(req.params.userId).then((success) => {
        if (success) {
            return res.status(200).send({message: "Wishlist cleared successfully."})
        } else {
            return res.status(500).send(defaultErr())
        }
    })
})

router.delete('/:userId/wishlist/:productId', authentication.check, authorization.check, (req, res) => {
    persistence.removeProductFromWishlist(
        Number(req.params.userId),
        Number(req.params.productId)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "NOT_PRESENT":
                return res.status(404).send({message: "Specified product is not in wishlist."})
            default:
                return res.status(200).send({message: "Product successfully removed from wishlist."})
        }
    })
})

/* Order functions */
// TODO: Add authorization rules 
router.post('/:userId/orders', authentication.check, authorization.check, createOrderValidator(), (req, res) => {
    persistence.createOrder(
        Number(req.params.userId),
        Number(req.body.address),
        req.body.observations
    )
    .then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "EMPTY_CART":
                return res.status(400).send({
                    message: "Your cart is empty. You can add items to it by using the cart manipulation endpoints."
                })
            case "INVALID_ADDRESS":
                return res.status(400).send({
                    message: "Invalid destination. Make sure to use an address registered to your account."
                })
            case "NO_STOCK":
                return res.status(400).send({
                    message: "Some items included in your cart are no longer available in the quantities you requested. Please double-check your cart."
                })
            default:
                return res.status(200).send({message: "Order successfully created.", id: result})
        }

    })
})

// TODO: Add authorization rules and validator
router.get('/:userId/orders', authentication.check, authorization.check, (req, res) => {
    try {
        persistence.getOrdersByUserID(
            Number(req.params.userId)
        ).then((result) => {
            if (result == null) {
                return res.status(500).send(defaultErr())
            }

            return res.status(200).json(result)


        })   
    } catch (e) {
        return res.status(500).send(defaultErr())
    }
})

module.exports = router;
