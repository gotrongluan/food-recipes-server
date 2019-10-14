const express = require('express');
const logger = require('morgan');
//const session = require('express-session');
//const FileStore = require('session-file-store');
const debug = require('debug')('food-recipes-server:loaders/express');

module.exports = async app => {
    if (app.get('env') === 'development') {
        app.use(logger('dev'));
        debug('Enable Morgan...'); 
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    //app.use(session(...));
    return app;
}