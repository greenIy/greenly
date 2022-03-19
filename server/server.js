/* Variable checking */
require("dotenv").config();

if (!("GOOGLE_API_KEY" in process.env) ||
   !("DATABASE_URL" in process.env)) { 
  console.log('❌ Missing environment variables. Double-check your .env file.');
  process.exit(0);
}

/* Imports */
const express = require('express');
const path = require('path');
const glob = require( 'glob' );
const argv = require('yargs').argv;

/* Middleware */
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const createError = require('http-errors');
const https = require('https');
const http = require('http');
const errorHandler = require('./lib/error').errorHandler;

/* Route Imports
   Exporting useful information and importing all API routes */

exports.argv = argv;
const user = require('./api/user');
const store = require('./api/store');
const supplier = require('./api/supplier');
const transporter = require('./api/transporter');

/* Init */
const app = express();

/* Middleware Init */
if (argv.l) { // Enable request logging if -l flag is present
  app.use(morgan('short'));
}

app.use(express.json({
  strict: false
}));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',
                  cookie: {maxAge: 600000},
                  resave: true,
                  saveUninitialized: true}))
app.use(express.urlencoded({ extended: true}));

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

// Using modular API routes
app.use('/user', user);
app.use('/store', store);
app.use('/supplier', supplier);
app.use('/transporter', transporter);

// Centralizing error handling

app.use(errorHandler);



const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`🌿 Greenly server listening on port ${port} ${
        argv.SSL != "False" ? "with SSL support! ✅" : "without SSL support! 🚫"
    }`)
    if (argv.l || argv.requestLogging) {
      console.log("📝 Request logging enabled.")
    }
    if (argv.m || argv.databaseMonitoring) {
      console.log("⚙️ Database monitoring enabled.")
    }
}).on('error', function (err) {
    if (err.code == 'EADDRINUSE') {
        console.log("🚫 Port already in use.");
    } else {
        console.log("🔥 Something went wrong.");
    }
    process.exit(1);
});


module.exports.app = app;
