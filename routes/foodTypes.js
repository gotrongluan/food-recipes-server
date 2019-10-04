const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const wrapResponse = require('../utils/wrapResponse');
const debug = require('debug')('food-recipes-server:food-types');
const FoodType = require('../models/foodTypes');

router.route('/')
    .get((req, res, next) => {
        const getFoodTypes = async () => {
            return await FoodType.find();
        };

        const run = async () => {
            try {
                const foodTypes = await getFoodTypes();
                if (foodTypes !== null)
                    res.successJson(wrapResponse(foodTypes));
                else
                    next(createError(500));
            }
            catch(err) {
                next(err);
            }
        };

        run();
    })
    .post((req, res) => {
        //validation input data --> error ? 400
        const saveFoodType = async foodType => {
            try {
                const realFoodType = await foodType.save();
                if (realFoodType !== null)
                    res.successJson(wrapResponse(realFoodType));
                else
                    next(createError(500));
            }
            catch (err) {
                next(err);
            }
        };
        const newFoodType = FoodType({
            key: req.body.key,
            name: req.body.name,
            icon: req.body.icon
        });
        saveFoodType(newFoodType);
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