const Joi = require('@hapi/joi');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false,
    }
});

userSchema.plugin(passportLocalMongoose);
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