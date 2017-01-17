'use strict';

const net = require('net');
const series = require('async/series');

const createServer = (port, formatter, onError) => {
  const server = net.createServer();
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

  server.on('connection', conn => {
    conn.on('data', data => {
      const formattedMessage = formatter(data);
      const remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
      series(middleware.map(fn => next => fn(formattedMessage, remoteAddress, next)));
      conn.write('ok');
      conn.end();
    });
    conn.on('error', onError);
  });

  server.listen(port);

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
