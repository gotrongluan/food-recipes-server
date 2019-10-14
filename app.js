const http = require('http');
const https = require('https');
const fs = require('fs');
const config = require('config');
const debug = require('debug')('food-recipes-server:server');
const express = require('express');
const loaders = require('./loaders');
const normalizePort = require('./utils/normalizePort');

const createServer = app => {
    
    const onError = port => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        
        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;
        
          // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
    const onListening = addr => {
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    };
    const port = normalizePort(config.get('port'));
    const securePort = normalizePort(config.get('securePort'));
    app.set('port', port);
    app.set('securePort', securePort);

    //Setup HTTP server
    const server = http.createServer(app);
    server.listen(app.get('port'));
    server.on('error', () => onError(app.get('port')));
    server.on('listening', () => onListening(server.address()));

    //Setup HTTPS server
    const options = {
        key: fs.readFileSync(`${__dirname}/ssl/private.key`),
        cert: fs.readFileSync(`${__dirname}/ssl/certificate.pem`),
    };
    const secureServer = https.createServer(options, app);
    secureServer.listen(app.get('securePort'));
    secureServer.on('error', () => onError(app.get('securePort')));
    secureServer.on('listening', () => onListening(secureServer.address()));
};

const startServer = async () => {
    let app = express();
    try {
        app = await loaders({ expressApp: app });
        createServer(app);
    }
    catch(err) {
        debug('Please try again!\n', err);
    }
};

startServer();