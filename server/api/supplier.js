/* Keep in mind, the path for each route in this file is prepended with /supplier */

const express = require('express');
const router = express.Router();

/* Greenly libraries */
const { 
    createWarehouseValidator,
    updateWarehouseValidator
} = require('../lib/validation.js');
const authentication    = require("../lib/authentication")
const authorization     = require("../lib/authorization")
const persistence       = require('../lib/persistence.js')
const defaultErr        = require("../lib/error").defaultErr

/* Warehouse Management Routes */

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
                return res.status(200).json({
                    id: result
                })
        }
    })

})

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

router.get('/:userId/warehouses/:warehouseId', authentication.check, authorization.check, (req, res) => {

    persistence.getWarehouse(
        Number(req.params.userId),
        Number(req.params.warehouseId)).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_WAREHOUSE":
                return res.status(404).send({message: "Warehouse not found. Make sure to specify a warehouse registered to your account."})
            default:
                return res.status(200).json(result)
        }
    })

})

router.put('/:userId/warehouses/:warehouseId', authentication.check, authorization.check, updateWarehouseValidator(), (req, res) => {

    persistence.updateWarehouse(
        Number(req.params.userId),
        Number(req.params.warehouseId),
        req.body).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_WAREHOUSE":
                return res.status(404).send({message: "Warehouse not found. Make sure to specify a warehouse registered to your account."})
            case "INVALID_ADDRESS":
                return res.status(400).send({
                    message: "Invalid address. Make sure to use an address registered to your account."
                })
            case "ADDRESS_IN_USE":
                return res.status(409).send({
                    message: "This address is already registered to another warehouse in your account."
                })
            default:
                return res.status(201).json({message: "Successfully updated warehouse details."})
        }
    })

})

router.delete('/:userId/warehouses/:warehouseId', authentication.check, authorization.check, (req, res) => {
    
    persistence.deleteWarehouse(
        Number(req.params.userId),
        Number(req.params.warehouseId),
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_WAREHOUSE":
                return res.status(404).send({message: "Warehouse not found. Make sure to specify a warehouse registered to your account."})
            case "WAREHOUSE_NOT_EMPTY":
                return res.status(409).send({message: "This warehouse cannot be deleted since there are supplies registered to it. Remove all supplies in this warehouse attempting to delete it."})
            default:
                return res.status(202).send({message: "Successfully deleted warehouse."})
        }
    })
})

module.exports = router;