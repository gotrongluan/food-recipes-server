const config = require('config');
const mongoose = require('mongoose');

module.exports = async () => {
    return await mongoose.connect(config.get('mongoUrl'));
}