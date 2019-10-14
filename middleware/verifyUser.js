const passport = require('passport');

const verifyUser = passport.authenticate('jwt', { session: false });

module.exports = verifyUser;