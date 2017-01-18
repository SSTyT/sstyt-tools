'use strict';

const q = require('q');
const mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

const connect = connecionString => {
  const deferred = q.defer();
  const db = mongoose.connection;

  mongoose.connect(connecionString, { server: { auto_reconnect: true } });
  db.on('error', err => {
    deferred.reject(err);
  });
  db.once('open', function() {
    deferred.resolve();
  });

  return deferred.promise;
}

const disconnect = () => mongoose.disconnect();

module.exports = {
  connect,
  disconnect
}
