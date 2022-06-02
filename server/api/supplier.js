/* Keep in mind, the path for each route in this file is prepended with /supplier */

const express = require('express');
const router = express.Router();

/* Greenly libraries */
const { 
    createWarehouseValidator
} = require('../lib/validation.js');
const authentication    = require("../lib/authentication")
const authorization     = require("../lib/authorization")
const persistence       = require('../lib/persistence.js')
const defaultErr        = require("../lib/error").defaultErr

/* Warehouse Management Routes */

router.get('/:userId/warehouses', authentication.check, authorization.check, (req, res) => {

    persistence.getWarehouses(
        Number(req.params.userId)).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            default:
                return res.status(200).json(result)
        }
    })

})

router.post('/:userId/warehouses', authentication.check, authorization.check, createWarehouseValidator(), (req, res) => {
    persistence.createWarehouse(
        Number(req.params.userId),
        Number(req.body.address),
        Number(req.body.capacity),
        Number(req.body.resource_usage),
        Number(req.body.renewable_resources)).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_ADDRESS":
                    return res.status(400).send({
                        message: "Invalid address. Make sure to use an address registered to your account."
                    })
                case "ADDRESS_IN_USE":
                    return res.status(409).send({
                        message: "This address is already registered to another warehouse in your account."
                    })
                default:
                    return res.status(200).json({id: result})
            }
        })
    
    })

module.exports = router;