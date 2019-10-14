const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/users');
const config = require('config');

module.exports =  async app => {
    passport.use(new LocalStrategy(User.authenticate()));
    //session
    // passport.serializeUser(User.serializeUser());
    // passport.deserializeUser(User.deserializeUser());

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('secretKey'),
    }, async (jwtoken, done) => {
        try {
            const user = await User.findById(jwtoken._id);
            if (user !== null)
                done(null, user);
            else
                done(null, false);
        }
        catch(err) {
            done(err, false);
        }
    }));

    app.use(passport.initialize());
    //session
    //app.use(passport.session());

    return app;
}