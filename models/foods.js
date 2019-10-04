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
        maxlength: 10,
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
        type: String
    },
    ingredients: {
        type: [ ingredientSchema ],
        default: [],
    },
    steps: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;