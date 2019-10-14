const debug = require('debug')('food-recipes-server:foods');
const _ = require('lodash');
const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const { Food, validate, validateFoodId } = require('../models/foods');
const wrapResponse = require('../utils/wrapResponse');
const verifyUser = require('../middleware/verifyUser')

router.route('/')
    .get(verifyUser, async (req, res, next) => {
        debug('Request queries: ', req.query);
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        try {
            const foods = await Food.find()
                .sort('-updatedAt')
                .skip((page - 1) * limit)
                .limit(limit);
            res.jsonSuccess(wrapResponse(foods));
        }
        catch (err) {
            next(err);
        }    
    })
    .post(async (req, res, next) => {
        const { error: validateError } = validate(req.body);
        if (validateError) {
            debug('Error ', validateError.details[0].message);
            return next(createError(400));
        }
        const newFood = new Food({
            name: req.body.name,
            avatar: req.body.avatar,
            steps: req.body.steps,
            ingredients: [...req.body.ingredients],
        });
        try {
            const realFood = await newFood.save();
            res.jsonSuccess(wrapResponse(realFood));
        }
        catch (err) {
            next(err);
        }
        
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
    .get(async (req, res, next) => {
        //Check if foodId is exist --> 404
        const { foodId } = req.params;
        const { error: validateFoodIdError } = validateFoodId(foodId);
        if (validateFoodIdError) {
            debug(validateFoodIdError.details[0].message);
            return next(createError(400));
        }
        try {
            const food = await Food.findById(foodId);
            if (food !== null) {
                res.jsonSuccess(wrapResponse(food));
            }
            else {
                next(createError(404));
            }
        }
        catch (err) {
            next(err);
        }
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post method isn\'t supported on endpoint /foods/:foodId');
    })
    .put(async (req, res, next) => {
        //check if foodId is exist --> 404
        const { foodId } = req.params;
        const { error: validateFoodIdError } = validateFoodId(foodId);
        if (validateFoodIdError) {
            return next(createError(400));
        }

        const updateData = { ...req.body };
        try {
            const updatedFood = await Food.findByIdAndUpdate(foodId, {
                $set: updateData
            }, { 
                new: true,
                runValidators: true,
            });
            if (updatedFood !== null) {
                res.jsonSuccess(wrapResponse(updatedFood));
            }
            else {
                next(createError(404));
            }
        }
        catch(err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        //check if foodId is exist --> 404
        const { foodId } = req.params;
        const { error: validateFoodIdError } = validateFoodId(foodId);
        if (validateFoodIdError) {
            return next(createError(400));
        }
        try {
            const removedFood = await Food.findByIdAndRemove(foodId);
            if (removedFood !== null) {
                res.jsonSuccess(wrapResponse(removedFood));
            }
            else {
                next(createError(404));
            }
        }
        catch (err) {
            next(err);
        }
    });

module.exports = router;