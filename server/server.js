/* Variable checking */
require("dotenv").config();

const requiredEnvironmentVariables = [
    "DATABASE_URL",
    "JWT_SECRET",
    "JWT_EXPIRATION",
    "GOOGLE_API_KEY",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "FACEBOOK_APP_ID",
    "FACEBOOK_APP_SECRET",
    "STRIPE_PUBLISHABLE_KEY",
    "STRIPE_CLIENT_SECRET",
    "STRIPE_WEBHOOK_SECRET"
]

if (requiredEnvironmentVariables.some((value) => !(value in process.env))) {
    console.log('❌ Missing environment variables. Double-check your .env file.');
    process.exit(0);
}

/* Imports */
const express = require('express');
const path = require('path');
const glob = require('glob');
const argv = require('yargs').argv;
const swag = require('figlet')

/* Exporting arguments for usage in other routers */
exports.argv = argv;

/* Middleware */
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');
const createError = require('http-errors');
const https = require('https');
const http = require('http');
// const privateKey    = fs.readFileSync('sslcert/privkey1.pem', 'utf8');
// const certificate   = fs.readFileSync('sslcert/cert1.pem', 'utf8');
// const ca            = fs.readFileSync('sslcert/chain1.pem', 'utf8')
// const credentials   = {
//                         key: privateKey,
//                         cert: certificate,
//                         ca: ca
//                     };
const cors = require('cors');
const errorHandler = require('./lib/error').errorHandler;
const passport = require('./lib/authentication').passport;
const moment = require('moment-timezone');

/* Initializing */
const app = express();

/* Middleware Init */
// Enable request logging middleware if -l flag is present
if (argv.l) {
    morgan.token('date', (req, res) => {
        return moment().tz("Europe/Lisbon").format('MMMM Do YYYY, H:mm:ss');
    })
    app.use(morgan(':status | :method :url | :remote-addr | :response-time ms | :date'));
}

// Important middleware

app.use(cors({
    origin: true,
    credentials: true
})) // Enable cross-origin resource sharing
app.use(express.json({ // Enable parsing for received JSON payloads
    strict: false
}));
app.use(cookieParser()); // Enable cookie parsing for session management
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    cookie: {
        maxAge: 600000
    },
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
// Using pre-setup passport with rules defined in lib/authentication.js
app.use(passport.initialize());
app.use(passport.session());
module.exports.passport = passport; // Allow passport to be used by other routes


/* Critical Routes */

// Auto Rerouting HTTP -> HTTPS
if (argv.SSL != "False") {
    app.use((req, res, next) => {
        if (!req.secure)
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    });
}

/* Importing all API routes */

const auth = require('./api/auth')
const user = require('./api/user');
const store = require('./api/store');
const supplier = require('./api/supplier');
const transporter = require('./api/transporter');

// Using modular API routes
app.use('/auth', auth);
app.use('/user', user);
app.use('/store', store);
app.use('/supplier', supplier);
app.use('/transporter', transporter);

// Centralizing error handling
app.use(errorHandler);

app.get('*', function (req, res) {
    return res.status(404).send({
        message: "Invalid endpoint. Check available endpoints at docs.greenly.pt."
    })
});

/* Starting server */

const port = process.env.PORT || 4000

console.log(swag.textSync('greenly-api', {
    font: 'Ogre',
    whitespaceBreak: true
}))

var httpserver = http.createServer(app);
// var httpsserver = https.createServer(credentials, app)

httpserver.listen(port, () => {
    console.log(`🌿 Greenly server listening on port ${port} ${
    argv.SSL != "False" ? "with SSL support! ✅" : "without SSL support! 🚫"}`)

    /* Flag definition */
    if (argv.l || argv.requestLogging) {
        console.log("📝 Request logging enabled.")
    }
    if (argv.m || argv.databaseMonitoring) {
        console.log("⚙️ Database monitoring enabled.")
    }

    // Setting development mode
    process.env.MODE = argv.dev ? "development" : "production"

    if (process.env.MODE == "development") {
        console.log("🏗️ Developer mode enabled.")
    }
}).on('error', function (err) {
    if (err.code == 'EADDRINUSE') {
        console.log(`🚫 Port ${port} already in use.`);
    } else {
        console.log("🔥 Something went wrong.");
    }
    process.exit(1);
});

module.exports.app = app;