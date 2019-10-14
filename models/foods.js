const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);                    //Joi.objectId is a method
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        minlength: 1,
        lowercase: true,
        default: 'mg'
    }
});

const foodSchema = new Schema({
    name: {
        type: String,
        minlength: 5,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://www.hoidaubepaau.com/wp-content/uploads/2016/08/ca-hoi-sot-teriyaki.jpg',
    },
    ingredients: {
        type: [ ingredientSchema ],
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'Ingredients must not be empty!',
        }
    },
    steps: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

const validate = (data) => {
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

    return schema.validate(data);
};

const validateFoodId = id => {
    return Joi.objectId().required().validate(id);
};

exports.Food = Food;
exports.validate = validate;
exports.validateFoodId = validateFoodId;
