/*  Greenly Authentication Library
    Functions included pertain to token validation and passport strategy definition.
*/

// Importing dependencies
const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User_type } = require('@prisma/client');
const bcrypt = require('bcrypt');


// Importing Greenly libraries
const {getUserByID, getUserByEmail} = require("./persistence");
const { restart } = require('nodemon');
const { defaultErr } = require('./error');

// Setting up passport

// TODO: Possibly remove serialize and deserialize since authentication will be stateless
passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    getUserByID(id).then((user) => {
        done(null, user)
    })
})


/* Defining login LocalStrategy (email + password), used to create new JWT tokens */
passport.use('basic-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) { // Callback
        getUserByEmail(email, true).then((user) => {
            if (!user) {
                return done(null, false, {
                    message: 'User with specified e-mail not found.'
                });
            } else {
                if (!bcrypt.compareSync(password, user.Credentials.value)) {
                    return done(null, false, {
                        message: 'Wrong credentials for specified user.'
                    });
                } else {
                    return done(null, user);
                }
            }
        })
    }))

authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}
/* Defining login GoogleStrategy, used to create new JWT tokens */

passport.use( new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: 'http://localhost:4000/auth/google/callback',
        passReqToCallback: true
    }, function (request, accessToken, refreshToken, profile, done) {
    console.log(profile.email);
    console.log(profile);
        getUserByEmail(profile.email, true).then((user) => {
            if (!user) {
                return done(null, false, {
                    message: 'User not found.'
                })
            } else {
                if (profile.id.equals(user.Credentials.value) && profile.provider.equals(user.Credentials.provider)){
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Returned wrong credentials.'
                    })
                }
            }
        })
    }
));


/* Defining JWT validation strategy, used to check if JWT tokens are valid. Does NOT authenticate, only validates token. */
passport.use(
    new JWTstrategy({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
        },
        async (req, token, done) => {
            try {
                if (token) {
                    // TODO: Check for blacklisted tokens here!
                    // Allow ID to proceed into authentication checking middleware
                    return done(null, token.user)
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

/* Easy-to-call validation function, calls JWT strategy and returns user object to request context */
// TODO: Eventually call other strategies through here too
const check = function (req, res, next) {
    passport.authenticate("jwt", {
        session: false
    }, async (err, tokenUser, info) => {
        if (err || !tokenUser) {
            // Handling any possible errors
            return res.status(401).json({message: "Invalid token. Unauthorized access."})
        }

        // If everything is alright, retrieve the user
        try {
            getUserByID(tokenUser.id).then((retrievedUser) => {
                if (retrievedUser) {
                    req.user = retrievedUser;
                    next()
                } else {
                    return res.status(401).json({message: "Invalid token. Unauthorized access."})
                }
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send(defaultErr())
        }
    })(req, res, next);
}

module.exports = {passport, check}
