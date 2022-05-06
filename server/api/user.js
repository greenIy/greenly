/* Keep in mind, the path for each route in this file is prepended with /user */

const { defaultUrl } = require('@googlemaps/google-maps-services-js/dist/directions');
const express = require('express');
const { isAuthenticated } = require('../lib/authentication.js');
const router = express.Router();

/* Greenly libraries & required server data */
const authentication    = require("../lib/authentication")
const authorization     = require("../lib/authorization")
const persistence       = require('../lib/persistence');
const defaultErr        = require("../lib/error").defaultErr
const { createUserValidator, updateUserValidator, createAddressValidator, updateAddressValidator } = require('../lib/validation.js');


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

router.post('/:userId/addresses/', authentication.check, authorization.check, createAddressValidator(), (req, res) => {
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
        persistence.deleteAddress(Number(req.params.addressId)).then((success) => {
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
// TODO: Complete validation and authorization for each of these routes
// TODO: Maybe find an alternative for index, possibly a unique ID which is inserted manually in POST (so, an index, but saved in the DB) even though that involves resetting all IDs when deleting one. Possibly decreasing by one all IDs where id > deletedId?

router.get('/:userId/cart', (req, res) => {
    try {
        persistence.getCart(Number(req.params.userId)).then((result) => {
            res.status(200).json(result)
        })

    } catch {
        res.status(500).send(defaultErr())
    }
})

router.post('/:userId/cart', (req, res) => {
    
})

router.delete('/:userId/cart', (req, res) => {
    
})

router.put('/:userId/cart/:index', (req, res) => {
    
})

router.delete('/:userId/cart/:index', (req, res) => {
    
})




module.exports = router;
