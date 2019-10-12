const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/users');
const config = require('config');
const jwt = require('jsonwebtoken');

exports.getToken = data => {
    return jwt.sign(data, config.get('secretKey'), { expiresIn: 3600 });
};

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('secretKey'),
}, async (jwt_token, done) => {
    try {
        const user = await User.findById(jwt_token._id);
        if (user !== null)
            done(null, user);
        else
            done(null, false);
    }
    catch(err) {
        done(err, false);
    }
}));

exports.verifyUser = passport.authenticate('jwt', { session: false });