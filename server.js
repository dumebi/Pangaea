// Package Dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { handleError } = require('./utils/utils')
const cors = require('cors');
const compression = require('compression');
const app = express();
require('dotenv').config();
require('./utils/connection').mongo();
// require('./Publisher/utils/connection').rabbitmq();
// require('./Publisher/utils/connection').subscribe();
// require('./utils/connection').socket();

// redis-server --maxmemory 10mb --maxmemory-policy allkeys-lru
// Midelware stack
app.use(cors({
  origin: '*'
}))
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(logRequest);
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'build/contracts')))

/* Application Routes */
app.use('/v1/', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res) => {
  // logger.logAPIResponse(req, res);
  handleError(req, res, 404, 'Page not found')
});
module.exports = app;
