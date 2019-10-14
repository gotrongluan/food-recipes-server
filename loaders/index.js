const debug = require('debug')('food-recipes-server:loaders');
const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const routeLoader = require('./route');
const templateLoader = require('./template');
const passportLoader = require('./passport');

module.exports =  async ({ expressApp }) => {
    let app = expressApp;
    //mongoose connect
    const connection = await mongooseLoader();
    debug('Connected to MongoDB');   
    //agendajs
    //templates
    app = await templateLoader(app);
    //express
    app = await expressLoader(app);
    //passportjs
    app = await passportLoader(app);
    //route
    app = await routeLoader(app);
    return app;
}