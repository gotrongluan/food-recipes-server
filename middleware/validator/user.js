const Joi = require('@hapi/joi');
const debug = require('debug')('food-recipes-server:users');
const createError = require('http-errors');

class UserValidator {
    static validateBody(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().min(10).required(),
            password: Joi.string().min(10).required(),
            admin: Joi.boolean(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            debug(error.details[0].message);
            return next(createError(400));
        }
        return next();
    }
}

module.exports = UserValidator;