'use strict';

const exphbs = require('express-handlebars');
const path = require('path');

module.exports = function(app) {

    // Handlebars helpers
    var partialsDir = [
        CLIENT_DIR,
        { dir: '/partials', namespace: 'partials' }
    ]

    // Handlebars engine setup
    app.engine('hbs', exphbs({
        extname: '.hbs',
        partialsDir: CLIENT_DIR,
        layoutsDir: CLIENT_DIR,
        defaultLayout: "main",
    }));


    // views dir setup
    app.set('views', CLIENT_DIR);

    // view engine set
    app.set('view engine', 'hbs');

    // App render method returns a promise
    // app.render = Promise.promisify(app.render).bind(app);
};