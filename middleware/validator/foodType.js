const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const debug = require('debug')('food-recipes-server:foodTypes');
const createError = require('http-errors');

class FoodTypeValidator {
    static validateBody(req, res, next) {
        const schema = Joi.object({
            key: Joi.string().required(),
            name: Joi.string().required(),
            icon: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            debug(error.details[0].message);
            return next(createError(400));
        }
        return next();
    }
}

module.exports = FoodTypeValidator;