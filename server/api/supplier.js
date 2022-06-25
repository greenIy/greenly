/* Keep in mind, the path for each route in this file is prepended with /supplier */

const express = require('express');
const router = express.Router();

/* Greenly libraries */
const { 
    createWarehouseValidator,
    updateWarehouseValidator,
    createSupplyValidator,
    updateSupplyValidator,
    createSupplyTransportValidator,
    updateSupplyTransportValidator,
    getInventoryValidator
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
                return res.status(409).send({message: "This warehouse cannot be deleted since there are supplies registered to it. Remove all supplies in this warehouse before attempting to delete it."})
            default:
                return res.status(200).send({message: "Successfully deleted warehouse."})
        }
    })
})

/* Supply Routes */

router.get(
    '/:userId/inventory', 
    authentication.check, 
    authorization.check, 
    getInventoryValidator(),
    (req, res) => {
    
    persistence.getInventory(
        Number(req.params.userId),
        Number(req.query.warehouse),
        req.query.sort
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            default:
                return res.status(200).json(result)
        }
    })
})

router.get('/:userId/inventory/:supplyId', authentication.check, authorization.check, (req, res) => {
    persistence.getSupply(
        Number(req.params.userId),
        Number(req.params.supplyId)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_SUPPLY":
                return res.status(404).send({message: "Supply not found. Make sure to specify an item you're currently selling."})
            default:
                return res.status(200).json(result)
        }
    })
})

router.post('/:userId/inventory', authentication.check, authorization.check, createSupplyValidator(), (req, res) => {
    persistence.createSupply(
        Number(req.params.userId),
        Number(req.body.product),
        Number(req.body.warehouse),
        Number(req.body.quantity),
        Number(req.body.price),
        req.body.production_date,
        req.body.expiration_date,
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_PRODUCT":
                return res.status(404).send({
                    message: "Invalid product. Make sure to specify a product registered on the website."
                })
            case "INVALID_WAREHOUSE":
                return res.status(404).send({
                    message: "Invalid warehouse. Make sure to use a warehouse registered to your account."
                })
            case "SUPPLY_CONFLICT":
                return res.status(409).send({
                    message: "This product is already being sold from this warehouse. Update your pre-existing supply or select a new product/warehouse combination."
                })
            default:
                return res.status(200).json({
                    id: result
                })
            }
    })
})

router.put('/:userId/inventory/:supplyId', authentication.check, authorization.check, updateSupplyValidator(),  (req, res) => {
    persistence.updateSupply(
        Number(req.params.userId),
        Number(req.params.supplyId),
        req.body
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_SUPPLY":
                return res.status(404).send({message: "Supply not found. Make sure to specify an item currently registered to your account."})
            default:
                return res.status(200).json({message: "Successfully updated supply details."})
        }
    })

})

router.delete('/:userId/inventory/:supplyId', authentication.check, authorization.check, (req, res) => {

    persistence.deleteSupply(
        Number(req.params.userId),
        Number(req.params.supplyId)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_SUPPLY":
                return res.status(404).send({message: "Supply not found. Make sure to specify an item currently registered to your account."})
            default:
                return res.status(200).send({message: "Successfully deleted supply."})
        }
    })
})

/* Supply Transport Routes */

router.post('/:userId/inventory/:supplyId/transports', authentication.check, authorization.check, createSupplyTransportValidator(), (req, res) => {

    persistence.createSupplyTransport(
        Number(req.params.userId),
        Number(req.params.supplyId),
        Number(req.body.transporter),
        Number(req.body.price)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_SUPPLY":
                return res.status(404).send({message: "Supply not found. Make sure to specify an item currently registered to your account."})
            case "INVALID_TRANSPORTER":
                return res.status(404).send({
                    message: "Invalid transporter. Make sure to specify a user registered as a transporter on the platform."
                })
            case "TRANSPORT_CONFLICT":
                return res.status(409).send({
                    message: "This supply is already being shipped with this transporter. Update your pre-existing transportation option or select a new supply/transporter combination."
                })
            default:
                return res.status(200).send({message: "Transport option succesfully added to supply."})
            }
    })

})

router.put(
    '/:userId/inventory/:supplyId/transports/:transporterId', 
    authentication.check, 
    authorization.check, 
    updateSupplyTransportValidator(), 
    (req, res) => {

        persistence.updateSupplyTransport(
            Number(req.params.userId),
            Number(req.params.supplyId),
            Number(req.params.transporterId),
            Number(req.body.price)
        ).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_SUPPLY":
                    return res.status(404).send({message: "Supply not found. Make sure to specify an item currently registered to your account."})
                case "INVALID_TRANSPORTER":
                    return res.status(404).send({
                        message: "Invalid transporter. Make sure to specify a transporter currently serving this supply."
                    })
                default:
                    return res.status(200).send({message: "Transport option succesfully updated."})
                }
        })
})

router.delete(
    '/:userId/inventory/:supplyId/transports/:transporterId',
    authentication.check, 
    authorization.check,
    (req, res) => {
        persistence.deleteSupplyTransport(
            Number(req.params.userId),
            Number(req.params.supplyId),
            Number(req.params.transporterId)
        ).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_SUPPLY":
                    return res.status(404).send({message: "Supply not found. Make sure to specify an item currently registered to your account."})
                case "INVALID_TRANSPORTER":
                    return res.status(404).send({
                        message: "Invalid transporter. Make sure to specify a transporter currently serving this supply."
                    })
                default:
                    return res.status(200).send({message: "Transport option succesfully deleted."})
                }
        })
    })

module.exports = router;