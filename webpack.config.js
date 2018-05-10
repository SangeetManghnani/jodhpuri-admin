const webpack = require('webpack');


var webpackConfig = {
    resolve: {
        extensions: ['.hbs', '.html'],
    },
    devtool: 'source-map',
    // output: {
    //     path: config.DIST_DIR,
    //     filename: 'bundle/[name].bundle.js'
    // },
    module: {
        loaders: [{
            test: /\.hbs$/,
            loader: 'handlebars'
        }, ]
    },
}

module.exports = webpackConfig;