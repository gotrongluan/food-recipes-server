const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 10,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 10,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User', userSchema);

const validate = data => {
    const schema = Joi.object({
        username: Joi.string().min(10).required(),
        password: Joi.string().min(10).required(),
        admin: Joi.boolean(),
    });
    return schema.validate(data);
};

module.exports.User = User;
module.exports.validate = validate;