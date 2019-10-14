const express = require('express');
const path = require('path');
const createError = require('http-errors');
const jsonSuccess = require('../middleware/jsonSuccess');
const usersRouter = require('../routes/users');
const foodsRouter = require('../routes/foods');
const foodTypesRouter = require('../routes/foodTypes');

module.exports = async app => {
    app.use(jsonSuccess);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/users', usersRouter);
    app.use('/foods', foodsRouter);
    app.use('/foodTypes', foodTypesRouter);
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });
    // error handler
    app.use((err, req, res) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
    return app;
}