const http = require('http');
const appConfig = require('./appConfig');
const express = require('express');
const app = express();
const helmet = require('helmet')
const mongoose = require('mongoose')
const logger = require('./app/lib/loggerLib')
const routeLogger = require('./app/middlewares/routeLogger')
const appErrorHandler = require('./app/middlewares/appErrorHandler')
const fs = require('fs');
const bodyparser = require('body-parser');

//middlewares
app.use(helmet())
app.use(routeLogger.logIp)
app.use(appErrorHandler.globalErrorHandler);
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

//Bootstrap models
let modelsPath = ('./app/model');

fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) require(modelsPath + '/' + file)
});
// end Bootstrap models

// Bootstrap route
let routesPath = './app/routes';

fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

//creating http server
let server = http.createServer(app);
server.listen(appConfig.port)
server.on('listening', onListening)
server.on('error', onError);

/**
 * http server events
 */

function onListening() {
    //console.log('inside onListening')

    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind);

    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
    let db = mongoose.connect(appConfig.db.uri,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
}

function onError() {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error;
    }


    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
            process.exit(1);
            break;
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
            throw error;
    }
}
/**End of http server events */

// socket io connection handler 
const socketLib = require('./app/lib/socketLib');
const socketServer = socketLib.setServer(server)

/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    logger.error(err, 'mongoose connection on error handler', 10)
}); // end mongoose connection error

mongoose.connection.on('open', function (err) {
    if (err) {
        logger.error(err, 'mongoose connection open handler', 10)
    } else {
        logger.info("database connection open", 'database connection open handler', 10)
    }
}); // enr mongoose connection open handler