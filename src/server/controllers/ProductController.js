const express = require('express');
const router = express.Router();
const db = require('../../../app').db;
const validator = require('../data/validationFramework');
var Constants = require('../Constants');

module.exports.createProduct = function(req, res) {
    if (validator.validate(Constants.LABEL_PRODUCT_ITEM, req.body)) {
        db.collection(Constants.DB_LABEL_PRODUCT_ITEM)
            .add(req.body).catch(err => {
                res.send(err)
            }).then(result => {
                res.send(result);
            });
    } else {
        return res.status(500).send('Invalid Data');
    }
}

module.exports.getAllProducts = function(req, res) {
    db.collection(DB_LABEL_PRODUCT_ITEM)
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

module.exports.deleteProductWithId = function(req, res) {
    db.collection(DB_LABEL_PRODUCT_ITEM)
        .doc(req.params.productId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
}

module.exports.updateProductWithId = function(req, res) {
    db.collection(DB_LABEL_PRODUCT_ITEM).doc(req.params.productId).update(req.body).then(function(result) {
        res.status().send(result);
    }).catch(function(err) {
        res.status().send(err);
    })
}