'use strict';

const dgram = require('dgram');
const series = require('async/series');

const createServer = (port, formatter, onError) => {
  const server = dgram.createSocket('udp4');
  const middleware = [];

  server.on('error', onError);

  server.on('listening', () => {
    const address = server.address();
    //TODO logging
  });

  server.on('close', () => {
    const address = server.address();
    //TODO logging
  });

  server.on('message', (message, remote) => {
    const formattedMessage = formatter(message);
    series(middleware.map(fn => next => fn(formattedMessage, remote, next)));
  });

  server.bind(port);

  return {
    use: fn => {
      middleware.push(fn);
      return this;
    },
    close: () => {
      server.close();
    }
  }
}

module.exports = {
  createServer
};
