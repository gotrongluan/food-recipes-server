const express = require('express');
const router = express.Router();
const wrapResponse = require('../utils/wrapResponse');
const verifyUser = require('../middleware/verifyUser');
const FoodType = require('../models/foodTypes');
const FoodTypeValidator = require('../middleware/validator/foodType');

router.route('/')
    .get(async (req, res, next) => {
        try {
            const foodTypes = await FoodType.find().sort('name');
            res.jsonSuccess(wrapResponse(foodTypes));
        }
        catch(err) {
            next(err);
        }
    })
    .post(verifyUser, FoodTypeValidator.validateBody, async (req, res, next) => {
        //validation input data --> error ? 400
        const newFoodType = FoodType({
            key: req.body.key,
            name: req.body.name,
            icon: req.body.icon
        });
        try {
            const realFoodType = await newFoodType.save();
            res.jsonSuccess(wrapResponse(realFoodType));
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