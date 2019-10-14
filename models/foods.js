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

module.exports = Food;
