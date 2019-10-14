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

module.exports = User;