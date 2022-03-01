
/* Imports */
const express = require('express');
const path = require('path');
const glob = require( 'glob' );

require("dotenv").config();

/* Middleware */
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const https = require('https');
const http = require('http');

/* Greenly libraries */
const persistence = import('./lib/persistence.js')

/* Route Imports
   Imports all site and API routes */

glob.sync( './routes/**/*.js' ).forEach( function( file ) {
  require( path.resolve( file ) );
}); 

/* Init */
const app = express();

/* Middleware Init */
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',
                  cookie: {maxAge: 600000},
                  resave: true,
                  saveUninitialized: true}))
app.use(bodyParser.urlencoded({ extended: false }));

/* Critical Routes */

// Auto Rerouting HTTP -> HTTPS
app.use((req, res, next) => {
  if (!req.secure)
      return res.redirect('https://' + req.headers.host + req.url);
  else
      return next();
});

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`🌿 Greenly server listening on port ${port}`)
})

module.exports = app;
