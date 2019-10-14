const Food = require('../models/foods');

class FoodService {
    static async getFoods(page, limit) {
        try {
            const foods = await Food.find()
                .sort('-updatedAt')
                .skip((page - 1) * limit)
                .limit(limit);
            return { error: null, value: foods };
        }
        catch(err) {
            return { error: err, value: null };
        }
    }
    static async createFood(payload) {
        try {
            let food = new Food(payload);
            food = await food.save();
            return { error: null, value: food };
        }
        catch(err) {
            return { error: err, value: null };
        }
    }
    static async getFood(id) {
        try {
            const food = await Food.findById(id);
            return { error: null, value: food };
        }
        catch(err) {
            return { error: err, value: null };
        }
    }
    static async updateFood(id, payload) {
        try {
            const updatedFood = await Food.findByIdAndUpdate(id, {
                $set: payload
            }, { 
                new: true,
                runValidators: true,
            });
            return { error: null, value: updatedFood };
        }
        catch(err) {
            return { error: err, value: null };
        }
    }
    static async deleteFood(id) {
        try {
            const removedFood = await Food.findByIdAndRemove(id);
            return { error: null, value: removedFood };
        }
        catch(err) {
            return { error: err, value: null };
        }
    }
}

module.exports = FoodService;