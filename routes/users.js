const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const passport = require('passport');
const getToken = require('../utils/getToken');
const debug = require('debug')('food-recipes-server:users');
const wrapResponse = require('../utils/wrapResponse');
const User = require('../models/users');
const UserValidator = require('../middleware/validator/user');
const UserService = require('../services/users');

//Basic authentication

router.post('/signup', UserValidator.validateBody, async (req, res, next) => {
	//Best practice when using register method of User is use callback
	const username = req.body.username;
	const password = req.body.password;

	const { error } = await UserService.signup(username, password);
	debug(error);
	if (error) return next(error);
	passport.authenticate('local')(req, res, () => {
		res.jsonSuccess(wrapResponse('Successful!'));
	});
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
	//if this callback is called, authentication was successful!!
	const token = getToken({ _id: req.user._id });
	res.jsonSuccess(wrapResponse({
		user: req.user,
		token: token,
	}));
});

router.get('/logout', async (req, res, next) => {
	if (req.user) {
		req.session.destroy();
		res.clearCookie('food-recipes-server-session-id');
	}
	res.jsonSuccess(wrapResponse(null));
})

module.exports = router;
