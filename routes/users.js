const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const debug = require('debug')('food-recipes-server:users');
const wrapResponse = require('../utils/wrapResponse');
const { User, validate } = require('../models/users');

//Basic authentication

router.post('/signup', async (req, res, next) => {
	const { error } = validate(req.body);
	debug(error);
	if (error)
		return next(createError(400));
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user !== null) {
			debug(`Username ${req.body.username} is already exist!`);
			res.successJson(wrapResponse(null));
		}
		else {
			let newUser = new User({
				username: req.body.username,
				password: req.body.password,
			});
			newUser =  await newUser.save();
			res.successJson(wrapResponse(newUser));
		}
	}
	catch(err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	if (!req.session.user) {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			const error = new Error('You are not authenticated!');
			error.status = 401;
			res.setHeader('WWW-Authenticate', 'Basic');
			next(error);
		}
		//get authorized data
		//authHeader = 'Basic base64...';
		const authData = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
		const username = authData[0];
		const password = authData[1];

		try {
			const user = await User.findOne({ username: username });
			if (user !== null) {
				if (user.password === password) {
					//Save cookie, session
					debug('Login successfully!');
					req.session.user = 'authenticated';
					res.successJson(wrapResponse(user));
				}
			}
			const error = new Error('Your username or password is incorrect!');
			error.status = 401;
			res.setHeader('WWW-Authenticate', 'Basic');
			next(error);
		}
		catch(err) {
			next(err);
		}
	}
	else {
		debug("Session is already exist!");
		res.successJson(wrapResponse(null));
	}
});

router.get('/logout', async (req, res, next) => {
	if (req.session.user) {
		req.session.destroy();
		res.clearCookie('food-recipes-server-session-id');
	}
	res.successJson(wrapResponse(null));
})

module.exports = router;
