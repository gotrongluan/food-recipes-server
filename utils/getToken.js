const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

const getToken =  data => {
    return jsonwebtoken.sign(data, config.get('secretKey'));
};

module.exports = getToken;