const debug = require('debug')('app:foods');
const express = require('express');
const router = express.Router();


router.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        if (process.env.NODE_ENV === 'development') {
            debug('Request queries: ', req.query);
        }
        res.end('Return foods');
    })
    .post((req, res) => {
        //validation input data --> error ? 400
        res.end('Create a new food');
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('Put method isn\'t supported on endpoint /foods');
    })
    .delete((req, res) => {
        res.statusCode = 403;
        res.end('Delete method isn\'t supported on endpoint /foods');
    });

router.route('/:foodId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        //Check if foodId is exist --> 404
        res.end('Return food with id ' + req.params.foodId);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post method isn\'t supported on endpoint /foods/:foodId');
    })
    .put((req, res) => {
        //check if foodId is exist --> 404
        //validate input data --> 400
        if (process.env.NODE_ENV === 'development') {
            debug('Request body', req.body);
        }
        res.end(`Food has id ${req.params.foodId} is updated!`);
    })
    .delete((req, res) => {
        //check if foodId is exist --> 404
        res.end(`Food has id ${req.params.foodId} is delete!`);
    });

module.exports = router;