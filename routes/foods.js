const debug = require('debug')('food-recipes-server:foods');
const _ = require('lodash');
const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const Food = require('../models/foods');
const wrapResponse = require('../utils/wrapResponse');


router.route('/')
    .get((req, res, next) => {
        if (process.env.NODE_ENV === 'development') {
            debug('Request queries: ', req.query);
        }
        const getFoods = async (page, limit) => {
            return await Food.find()
                .sort('-updatedAt')
                .skip((page - 1) * limit)
                .limit(limit);
        };
        
        const run = async () => {
            const { page = 1, limit = 10 } = req.query;
            try {
                const foods = await getFoods(parseInt(page), parseInt(limit));
                if (foods !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(wrapResponse(foods));
                }
                else {
                    //handle error
                    next(createError(500));
                }
            }
            catch (err) {
                next(err);
            }
        }
        
        run();     
    })
    .post((req, res, next) => {
        //validation input data --> error ? 400
        const saveFood = async (food) => {
            try {
                const realFood = await food.save();
                if (realFood !== null) {
                    debug('New food is created!\n', realFood);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(wrapResponse(realFood));
                }
                else {
                    //handle error
                    next(createError(500));
                }
            }
            catch (err) {
                debug('Error\n', err);
                next(err);
            }
        };

        const newFood = new Food({
            name: req.body.name,
            avatar: req.body.avatar,
            steps: req.body.steps,
            ingredients: [...req.body.ingredients],
        });
        saveFood(newFood);
        
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
    .get((req, res, next) => {
        //Check if foodId is exist --> 404
        const getFood = async id => {
            return await Food.findById(id);
        };

        const run = async () => {
            const { foodId } = req.params;
            try {
                const food = await getFood(foodId);
                if (food !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(wrapResponse(food));
                }
                else {
                    next(createError(500));
                }
            }
            catch (err) {
                next(createError(404));
            }
        };

        run();
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('Post method isn\'t supported on endpoint /foods/:foodId');
    })
    .put((req, res, next) => {
        //check if foodId is exist --> 404
        //validate input data --> 400
        const updateFood = async (id, updateData) => {
            try {
                const updatedFood = await Food.findByIdAndUpdate(id, {
                    $set: updateData
                }, { new: true });
                if (updatedFood !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(wrapResponse(updatedFood));
                }
                else {
                    next(createError(500));
                }
            }
            catch(err) {
                next(err);
            }
            
        };

        const { foodId } = req.params;
        const updateData = { ...req.body };
        updateFood(foodId, updateData);
    })
    .delete((req, res, next) => {
        //check if foodId is exist --> 404
        const removeFoodById = async id => {
            try {
                const removedFood = await Food.findByIdAndRemove(id);
                if (removedFood !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(wrapResponse(removedFood));
                }
                else {
                    next(createError(500));
                }
            }
            catch (err) {
                next(createError(404));
            }
        };
        const { foodId } = req.params;
        removeFoodById(foodId);
    });

module.exports = router;