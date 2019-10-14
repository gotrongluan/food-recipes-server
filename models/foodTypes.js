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

module.exports = FoodType;