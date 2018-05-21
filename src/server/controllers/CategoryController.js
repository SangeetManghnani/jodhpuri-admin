const express = require('express');
const router = express.Router();
const db = require('../../../app').db;
const validator = require('../data/validationFramework');

module.exports.createCategory = function(req, res) {

}

module.exports.getAllCategories = function(req, res) {
    return res.render('categories/categories');
};