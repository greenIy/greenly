/* Variable checking */
require("dotenv").config();

const requiredEnvironmentVariables = ["GOOGLE_API_KEY", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "FACEBOOK_APP_ID", "FACEBOOK_APP_SECRET", "DATABASE_URL", "JWT_SECRET", "JWT_EXPIRATION"]

if (requiredEnvironmentVariables.some((value) => !(value in process.env))) { 
  console.log('❌ Missing environment variables. Double-check your .env file.');
  process.exit(0);
}

/* Imports */
const express   = require('express');
const path      = require('path');
const glob      = require('glob');
const argv      = require('yargs').argv;
const swag      = require('figlet') 

/* Exporting arguments for usage in other routers */
exports.argv = argv;

/* Middleware */
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const morgan        = require('morgan');
const createError   = require('http-errors');
const https         = require('https');
const http          = require('http');
const cors          = require('cors');
const errorHandler  = require('./lib/error').errorHandler;
const passport      = require('./lib/authentication').passport;

/* Initializing */
const app = express();

/* Middleware Init */
// Enable request logging middleware if -l flag is present
if (argv.l) {             
  app.use(morgan(':status | :method :url | :remote-addr | :response-time ms | :date[web]'));
}

// Important middleware
app.use(cors())           // Enable cross-origin resource sharing
app.use(express.json({    // Enable parsing for received JSON payloads
  strict: false
}));
app.use(cookieParser());  // Enable cookie parsing for session management
app.use(express.urlencoded({ extended: true}));
app.use(session({ secret: process.env.SESSION_SECRET || 'keyboard cat',
                  cookie: {maxAge: 600000},
                  resave: true,
                  saveUninitialized: true}));

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

const auth        = require('./api/auth')
const user        = require('./api/user');
const store       = require('./api/store');
const supplier    = require('./api/supplier');
const transporter = require('./api/transporter');

// Using modular API routes
app.use('/auth', auth);
app.use('/user', user);
app.use('/store', store);
app.use('/supplier', supplier);
app.use('/transporter', transporter);

// Centralizing error handling
app.use(errorHandler);


/* Starting server */

const port = process.env.PORT || 4000

console.log(swag.textSync('greenly-api', {
  font: 'Ogre',
  whitespaceBreak: true
}))

app.listen(port, () => {
    console.log(`🌿 Greenly server listening on port ${port} ${
    argv.SSL != "False" ? "with SSL support! ✅" : "without SSL support! 🚫"
}`)

    /* Flag definition */
    if (argv.l || argv.requestLogging) {
      console.log("📝 Request logging enabled.")
    }
    if (argv.m || argv.databaseMonitoring) {
      console.log("⚙️ Database monitoring enabled.")
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