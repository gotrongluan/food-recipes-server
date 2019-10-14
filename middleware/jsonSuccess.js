const jsonSuccess = (req, res, next) => {
    res.jsonSuccess = data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    };
    next();
}

module.exports = jsonSuccess;