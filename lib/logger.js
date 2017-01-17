'use strict';

const winston = require('winston');

module.exports = (config) => new(winston.Logger)({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File(config.transports)
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File(config.exceptions)
  ]
});
