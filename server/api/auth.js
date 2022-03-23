/* Keep in mind, the path for each route in this file is prepended with /auth */

// Imports
const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const jwt       = require("jsonwebtoken");

/* Greenly libraries */
const { loginValidator } = require('../lib/validation');
const { defaultErr } = require('../lib/error.js');

/* This function uses the basic-login strategy. Returns JWT token to use if everything goes well, returns error messages otherwise. */

router.post('/login', loginValidator(), async (req, res, next) => {
    passport.authenticate('basic-login', async (err, user, info) => {
        try {
            if (err) {
                // Handling any possible errors
                return res.status(500).send(defaultErr())
            }
            if (!user) {
                // If the authentication goes wrong
                return res.status(401).send(info)
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) {
                    // Handling any possible errors
                    return res.status(500).send(defaultErr())
                }
                // If everything goes well, generate the new JWT token and send it.
                const body = {
                    id: user.id,
                    email: user.email
                };
                const token = jwt.sign({
                    user: body
                }, process.env.JWT_SECRET);

                return res.json({
                    token: token,
                    id: user.id
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;