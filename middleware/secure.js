const config = require('config');

const redirectToSecureServer = (req, res, next) => {
    if (req.secure) return next();
    res.redirect(307, `https://${req.hostname}:${config.get('securePort')}${req.url}`);
}

module.exports = redirectToSecureServer;