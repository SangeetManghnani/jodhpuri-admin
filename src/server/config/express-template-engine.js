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
    app.engine('html', exphbs({
        extname: '.html',
        partialsDir: CLIENT_DIR,
        layoutsDir: CLIENT_DIR,
        defaultLayout: "main",
    }));


    // views dir setup

    app.set('views', CLIENT_DIR);

    // view engine set
    app.set('view engine', 'html');

    // App render method returns a promise
    // app.render = Promise.promisify(app.render).bind(app);
};