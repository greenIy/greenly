
/* Imports */
const express = require('express');
const path = require('path');
const bcrypt = import('bcrypt');
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

app.listen(process.env.PORT, () => {
  console.log(`🌿 Greenly server listening on port ${process.env.PORT}`)
})

module.exports = app;
