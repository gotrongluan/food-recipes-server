const sessionAuth = (req, res, next) => {
    if (!req.user) {
        let error = new Error('You are not authenticated!');
        error.status = 403;
        return next(error);
    }
    next();
};

module.exports = sessionAuth;