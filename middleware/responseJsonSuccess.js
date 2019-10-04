const responseJsonSuccess = (req, res, next) => {
    res.successJson = data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    };
    next();
}

module.exports = responseJsonSuccess;