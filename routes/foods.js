const debug = require('debug')('food-recipes-server:foods');
const _ = require('lodash');
const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const Food = require('../models/foods');
const FoodValidator = require('../middleware/validator/food');
const wrapResponse = require('../utils/wrapResponse');
const verifyUser = require('../middleware/verifyUser');
const FoodService = require('../services/foods');

router.route('/')
    .get(FoodValidator.validateParams, async (req, res, next) => {
        const { page, limit } = req.queryParams;
        const { error, value: foods } = await FoodService.getFoods(page, limit);
        if (error) return next(error);
        res.jsonSuccess(wrapResponse(foods));
    })
    .post(verifyUser, FoodValidator.validateBody, async (req, res, next) => {
        const payload = _.pick(req.body, ['name', 'avatar', 'steps', 'ingredients']);
        const { error, value: newFood } = await FoodService.createFood(payload);
        if (error) return next(error);
        res.jsonSuccess(wrapResponse(newFood));    
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
    .get(FoodValidator.validateId, async (req, res, next) => {
        //Check if foodId is exist --> 404
        const { foodId } = req.params;
        const { error, value: food } = await FoodService.getFood(foodId);
        if (error) return next(error);
        if (food === null) return next(createError(404));
        res.jsonSuccess(wrapResponse(food));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post method isn\'t supported on endpoint /foods/:foodId');
    })
    .put(verifyUser, FoodValidator.validateId, async (req, res, next) => {
        const { foodId } = req.params;
        const updateData = _.pick(req.body, ['name', 'avatar', 'steps', 'ingredients']);
        const { error, value: updatedFood } = await FoodService.updateFood(foodId, updateData);
        if (error) return next(error);
        if (updatedFood === null) return next(createError(404));
        res.jsonSuccess(wrapResponse(updatedFood));
    })
    .delete(verifyUser, FoodValidator.validateId, async (req, res, next) => {
        //check if foodId is exist --> 404
        const { foodId } = req.params;
        const { error, value: deletedFood } = await FoodService.deleteFood(foodId);
        if (error) return next(error);
        if (deletedFood === null) return next(createError(404));
        res.jsonSuccess(wrapResponse(deletedFood));
    });

module.exports = router;