const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const wrapResponse = require('../utils/wrapResponse');
const debug = require('debug')('food-recipes-server:food-types');
const { FoodType, validate } = require('../models/foodTypes');

router.route('/')
    .get(async (req, res, next) => {
        try {
            const foodTypes = await FoodType.find().sort('name');
            res.successJson(wrapResponse(foodTypes));
        }
        catch(err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {
        //validation input data --> error ? 400
        const { error: validateError } = validate(req.body);
        if (validateError) {
            debug('Error ', validateError.details[0].message);
            next(createError(400));
            return;
        }
        const newFoodType = FoodType({
            key: req.body.key,
            name: req.body.name,
            icon: req.body.icon
        });
        try {
            const realFoodType = await newFoodType.save();
            res.successJson(wrapResponse(realFoodType));
        }
        catch (err) {
            next(err);
        }
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('Put method isn\'t supported on endpoint /foodTypes');
    })
    .delete((req, res) => {
        res.statusCode = 403;
        res.end('Delete method isn\'t supported on endpoint /foodTypes');
    });

module.exports = router;