const express = require('express');
const router = express.Router();
const db = require('../../../app').db;
const validator = require('../data/validationFramework');
var Constants = require('../Constants');

module.exports.createCategory = function(req, res) {
    if (validator.validate(Constants.LABEL_CATEGORY, req.body)) {
        db.collection(Constants.DB_LABEL_CATEGORY)
            .add(req.body).catch(err => {
                res.send(err)
            }).then(result => {
                res.send(result);
            });
    } else {
        return res.status(500).send('Invalid Data');
    }

}
module.exports.getAllCategories = function(req, res) {
    db.collection(DB_LABEL_CATEGORY)
        .get()
        .catch(err => {
            res.send(err)
        }).then(snapshot => {
            const responseData = [];
            snapshot.forEach(doc => {
                responseData.push({ id: doc.id, data: doc.data() });
            });
            res.send(responseData);
        });
};

module.exports.getAllCategories = function(req, res) {
    return res.render('categories/categories');
};