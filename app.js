var admin = require('firebase-admin');
var jsonfile = require('jsonfile');
var express = require('express');
var bodyParser = require('body-parser');

var productSample = {
    name: 'Sofa',
    price: 14999,
    desc: 'An Italian finish sofa carved out of rich wood from Italy. Comfort is all you will get!',
};

const securityKey = jsonfile.readFileSync('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(securityKey),
    databaseURL: 'https://firestoredemo-4ceasdasdad6.firebaseio.com'
});

if (admin.apps.length == 0) {
    console.log("Cannot initialize Firebase. Please check!");
    return;
}

console.log("Firebase initialized successfully.");
console.log("Hello World!!! Welcome to Jodhpuri Furnitures...");

var db = admin.firestore();
var app = express();
app.listen(8000);
app.use(bodyParser.json());

app.post('/products', function(req, res) {
    console.log(req.body);
    db.collection('products').add(req.body);
});

app.get('/products', function(req, res) {
    db.collection('products')
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
});