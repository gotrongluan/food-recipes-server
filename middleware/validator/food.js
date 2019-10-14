const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const debug = require('debug')('food-recipes-server:foods');
const createError = require('http-errors');

class FoodValidator {
    static validateBody(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(5).required(),
            avatar: Joi.string(),
            ingredients: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    amount: Joi.number().required(),
                    unit: Joi.string().min(1)
                })
            ).min(2).required(),
            steps: Joi.string().required(),
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
            debug(error.details[0].message);
            return next(createError(400));
        }
        return next();
    }
    static validateId(req, res, next) {
        const { foodId } = req.params;
        const { error } = Joi.objectId().required().validate(foodId);
        if (error) {
            debug(error.details[0].message);
            return next(createError(400));
        }
        return next();
    }
    static validateParams(req, res, next) {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return next(createError(400));
        }
        req.queryParams = {
            page, limit,
        };
        return next();
    }
};

module.exports = FoodValidator;