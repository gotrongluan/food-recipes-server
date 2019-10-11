const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const passport = require('passport');
const debug = require('debug')('food-recipes-server:users');
const wrapResponse = require('../utils/wrapResponse');
const { User, validate } = require('../models/users');

//Basic authentication

router.post('/signup', async (req, res, next) => {
	const { error } = validate(req.body);
	debug(error);
	if (error)
		return next(createError(400));
	//Best practice when using register method of User is use callback
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			return next(err);
		}
		passport.authenticate('local')(req, res, () => {
			res.successJson(wrapResponse('Successful!'));
		})
	});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	//if this callback is called, authentication was successful!!
	res.successJson(wrapResponse(req.user));
});

router.get('/logout', async (req, res, next) => {
	if (req.user) {
		req.session.destroy();
		res.clearCookie('food-recipes-server-session-id');
	}
	res.successJson(wrapResponse(null));
})

module.exports = router;
