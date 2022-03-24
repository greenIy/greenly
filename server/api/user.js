/* Keep in mind, the path for each route in this file is prepended with /user */

const { defaultUrl } = require('@googlemaps/google-maps-services-js/dist/directions');
const express = require('express');
const router = express.Router();

/* Greenly libraries & required server data */
const persistence = require('../lib/persistence.js');
const { createUserValidator, updateUserValidator } = require('../lib/validation.js');
const defaultErr = require("../lib/error").defaultErr

/* GET /user (Admin only) */

router.get('/', (req, res) => {
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

router.post('/', createUserValidator(), (req, res) => {
            
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

router.get('/:userId', (req, res) => {
    
    try {
        persistence.getUserByID(Number(req.params.userId)).then((user) => {
            if (user) {

                // Renaming Address key (Prisma limitation)
                delete Object.assign(user, {["address"]: user["Address"] })["Address"];
                
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

router.put('/:userId', updateUserValidator(), (req, res) => {

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

router.delete('/:userId', (req, res) => {

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

module.exports = router;
