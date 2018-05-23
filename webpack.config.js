const webpack = require('webpack');
var path = require('path');

const DIST_DIR = path.join(__dirname, "dist");
const CLIENT_DIR = path.join(__dirname, "/src/client");
const NPM_DIR = path.join(__dirname, './node_modules/');

console.log(CLIENT_DIR);

var webpackConfig = {
    resolve: {
        extensions: ['.hbs', '.html'],
    },
    devtool: 'source-map',
    entry: {
        main: CLIENT_DIR + '/categories/category.js',
    },
    output: {
        path: DIST_DIR,
        filename: 'bundle/[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: NPM_DIR,
            loader: 'babel-loader',
        }, {
            test: /\.hbs$/,
            loader: 'handlebars'
        }]
    },
    // module: {
    //     loaders: [{
    //         test: /\.hbs$/,
    //         loader: 'handlebars'
    //     }, ]
    // },
}

module.exports = webpackConfig;