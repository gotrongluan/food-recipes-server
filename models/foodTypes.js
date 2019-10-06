const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodTypeSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        unique: true,
        required: true,
    }
});

const FoodType = mongoose.model('FoodType', foodTypeSchema);
const validate = (data) => {
    const schema = Joi.object({
        key: Joi.string().required(),
        name: Joi.string().required(),
        icon: Joi.string().required(),
    });
    return schema.validate(data);
}
module.exports.FoodType = FoodType;
module.exports.validate = validate;