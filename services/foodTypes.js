const FoodType = require('../models/foodTypes');

class FoodTypeService {
    static async getFoodTypes(page, limit) {
        try {
            const foodTypes = await FoodType.find().sort('name');
            return { error: null, value: foodTypes };
        }
        catch(err) {
            return { error: err, value: null };
        }
    }
    static async createFoodType(payload) {
        let foodType = FoodType(payload);
        try {
            foodType = await foodType.save();
            return { error: null, value: foodType };
        }
        catch(err) {
            return { error: err, value: null };
        }
    }
}

module.exports = FoodTypeService;