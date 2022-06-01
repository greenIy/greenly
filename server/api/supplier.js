/* Keep in mind, the path for each route in this file is prepended with /supplier */

const express = require('express');
const router = express.Router();

/* Greenly libraries */
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

module.exports = router;