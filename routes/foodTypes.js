const express = require('express');
const _ = require('lodash');
const router = express.Router();
const wrapResponse = require('../utils/wrapResponse');
const verifyUser = require('../middleware/verifyUser');
const FoodType = require('../models/foodTypes');
const FoodTypeValidator = require('../middleware/validator/foodType');
const FoodTypeService = require('../services/foodTypes');

router.route('/')
    .get(async (req, res, next) => {
        const { error, value: foodTypes } = await FoodTypeService.getFoodTypes();
        if (error) return next(error);
        res.jsonSuccess(wrapResponse(foodTypes));
    })
    .post(verifyUser, FoodTypeValidator.validateBody, async (req, res, next) => {
        //validation input data --> error ? 400
        const payload = _.pick(req.body, ['key', 'name', 'icon']);
        const { error, value: foodType } = await FoodTypeService.createFoodType(payload);
        if (error) return next(error);
        res.jsonSuccess(wrapResponse(foodType));
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