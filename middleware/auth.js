const auth = (req, res, next) => {
    if (!req.session.user || req.session.user !== 'authenticated') {
        let error = new Error('You are not authenticated!');
        error.status = 403;
        return next(error);
    }
    next();
};

module.exports = auth;