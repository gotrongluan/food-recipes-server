const responseJsonSuccess = (req, res) => {
    res = {
        ...res,
        successJson: data => {
            this.statusCode = 200;
            this.setHeader('Content-Type', 'application/json');
            this.json(data);
        }
    }
}

module.exports = responseJsonSuccess;