/* Keep in mind, the path for each route in this file is prepended with /auth */

// Imports
const express   = require('express');
const router    = express.Router();
const passport  = require('../server').passport;
const jwt       = require("jsonwebtoken");
const cors = require('cors');

/* Greenly libraries */
const { loginValidator } = require('../lib/validation');
const { defaultErr } = require('../lib/error');
const authentication = require('../lib/authentication');

router.all('*', cors({origin: '*'}));

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
                }, process.env.JWT_SECRET,
                // Signing options
                {
                    expiresIn: process.env.JWT_EXPIRATION
                });

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

// Handle the login with Google strategy
router.post('/google', async (req, res, next) => {
    passport.authenticate('google-login',
        {scope: ['email', 'profile' ]},
        async (err, user, info) => {
    try {
        if (err) {
            console.log(err);
            return res.status(500).send(defaultErr())
        }
        if (!user) {
            console.log(info);
            return res.status(401).send(info)
        }
        req.login(user, {
            session: false
        }, async (error) => {
            if (error) {
                return res.status(500).send(defaultErr())
            }
            const body = {
                id: user.id,
                email: user.email
            };
            const token = jwt.sign({
                    user: body
                }, process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRATION
                });
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

/* This function handles the Facebook sign-in strategy. Returns JWT token to use if everything goes well, returns error messages otherwise. */

router.post('/facebook', async (req, res, next) => {
    passport.authenticate('facebook-login',{scope: ['email', 'public_profile']}, async (err, user, info) => {
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
                }, process.env.JWT_SECRET,
                // Signing options
                {
                    expiresIn: process.env.JWT_EXPIRATION
                });
                return res.json({
                    token: token,
                    id: user.id
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}
);

router.get('/status', authentication.check, async (req, res, next) => {
    if (req.user) {
        res.status(200).send({
            message: "Valid token. User logged in.",
            id: req.user.id
        })
    }
})

module.exports = router;