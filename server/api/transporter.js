/* Keep in mind, the path for each route in this file is prepended with /transporter */

const express = require('express');
const router = express.Router();

/* Greenly libraries */
const { 
    createDistributionCenterValidator, updateDistributionCenterValidator,
    createVehicleValidator,
    updateVehicleValidator
} = require('../lib/validation.js');
const authentication    = require("../lib/authentication")
const authorization     = require("../lib/authorization")
const persistence       = require('../lib/persistence.js')
const defaultErr        = require("../lib/error").defaultErr

/* Distribution Center Management Routes */

router.get('/:userId/centers', authentication.check, authorization.check, (req, res) => {

    persistence.getDistributionCenters(
        Number(req.params.userId)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            default:
                return res.status(200).json(result)
        }
    })

})

router.get('/:userId/centers/:centerId', authentication.check, authentication.check, (req, res) => {

    persistence.getDistributionCenter(
        Number(req.params.userId),
        Number(req.params.centerId)).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_DISTRIBUTION_CENTER":
                    return res.status(404).send({message: "Distribution center not found. Make sure to specify a distribution center registered to your account."})
                default:
                    return res.status(200).json(result)
            }
        })

})

router.post('/:userId/centers', authentication.check, authorization.check, createDistributionCenterValidator(), (req, res) => {

    persistence.createDistributionCenter(
        Number(req.params.userId),
        Number(req.body.address),
        Number(req.body.capacity)).then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_ADDRESS":
                    return res.status(400).send({
                        message: "Invalid address. Make sure to use an address registered to your account."
                    })
                case "ADDRESS_IN_USE":
                    return res.status(409).send({
                        message: "This address is already registered to another distribution center in your account."
                    })
                default:
                    return res.status(200).json({
                        id: result
                    })
            }  
        })

})

router.put('/:userId/centers/:centerId', authentication.check, authorization.check, updateDistributionCenterValidator(), (req, res) => {

    persistence.updateDistributionCenter(
            Number(req.params.userId),
            Number(req.params.centerId),
        req.body).then((result) => {

        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_DISTRIBUTION_CENTER":
                return res.status(404).send({message: "Distribution center not found. Make sure to specify a distribution center registered to your account."})
            case "INVALID_ADDRESS":
                return res.status(400).send({
                    message: "Invalid address. Make sure to use an address registered to your account."
                })
            case "ADDRESS_IN_USE":
                return res.status(409).send({
                    message: "This address is already registered to another distribution center in your account."
                })
            default:
                return res.status(201).json({message: "Successfully updated distribution center details."})
        }

    })

})

router.delete('/:userId/centers/:centerId', authentication.check, authorization.check, (req, res) => {

    persistence.deleteDistributionCenter(
        Number(req.params.userId),
        Number(req.params.centerId)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_DISTRIBUTION_CENTER":
                return res.status(404).send({message: "Distribution center not found. Make sure to specify a distribution center registered to your account."})
            case "DISTRIBUTION_CENTER_NOT_EMPTY":
                return res.status(409).send({message: "This distribution center cannot be deleted since there are vehicles registered to it. Remove all vehicles in this distribution center before attempting to delete it."})
            default:
                return res.status(200).send({message: "Successfully deleted distribution center."})
        }

    })

})

/* Vehicle Routes */

router.get('/:userId/vehicles', authentication.check, authorization.check, (req, res) => {
// TODO: Get should have a distribution center filter
    persistence.getVehicles(
        Number(req.params.userId)
    ).then((result) => {
        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            default:
                return res.status(200).json(result)
        }
    })

});



router.post('/:userId/vehicles', authentication.check, authorization.check, createVehicleValidator(), (req, res) => {

    persistence.createVehicle(
        Number(req.params.userId),
        Number(req.body.distribution_center),
        req.body.license_plate,
        Number(req.body.payload_capacity),
        Number(req.body.resource_usage),
        Number(req.body.average_emissions),
        req.body.fuel_type
    ).then((result) => {
        // TODO: Eventually add a warning saying there are too many vehicles in this distribution center

        switch (result) {
            case null:
                return res.status(500).send(defaultErr())
            case "INVALID_DISTRIBUTION_CENTER":
                return res.status(404).send({message: "Distribution center not found. Make sure to specify a distribution center registered to your account."})
            case "LICENSE_PLATE_CONFLICT":
                return res.status(409).send({message: "There is already a vehicle registered with this license plate."})
            default:
                return res.status(201).json(result)
        }

    })
})

router.put('/:userId/vehicles/:vehicleId', authentication.check, authorization.check, updateVehicleValidator(), (req, res) => {
    persistence.updateVehicle(
        Number(req.params.userId),
        Number(req.params.vehicleId),
        req.body)
        .then((result) => {
            switch (result) {
                case null:
                    return res.status(500).send(defaultErr())
                case "INVALID_VEHICLE":
                    return res.status(404).send({message: "Vehicle not found. Make sure to specify a vehicle registered to your account."})
                case "INVALID_DISTRIBUTION_CENTER":
                    return res.status(404).send({message: "Distribution center not found. Make sure to specify a distribution center registered to your account."})
                case "LICENSE_PLATE_CONFLICT":
                    return res.status(409).send({message: "There is already a vehicle registered with this license plate."})
                default:
                    return res.status(201).json({message: "Successfully updated vehicle details."})
            }
        })
})



module.exports = router;