var admin = require('firebase-admin');
var jsonfile = require('jsonfile');
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var configTemplateEngine = require('./src/server/config/express-template-engine');
var validator = require('./src/server/data/validationFramework');
var Constants = require('./src/server/Constants');
var sampleCartItem = require('./src/server/data/samples/cart-item.json');
var sampleCategory = require('./src/server/data/samples/category.json');
var orderItem = require('./src/server/data/samples/order-item.json');
var productItem = require('./src/server/data/samples/product-item.json');


// console.log(validator.validate(Constants.LABEL_CART_ITEM, sampleCartItem));
console.log(validator.validate(Constants.LABEL_PRODUCT_ITEM, productItem));

var productSample = {
    name: 'Sofa',
    price: 14999,
    desc: 'An Italian finish sofa carved out of rich wood from Italy. Comfort is all you will get!',
};

/********************************
 * Constants definition
 ********************************/
global.CLIENT_DIR = path.resolve(__dirname, './src/client');

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

configTemplateEngine(app);

// handlebars setup
// app.engine('hbs', exphbs({
//     extname: '.hbs',
//     partialsDir: CLIENT_DIR,
//     layoutsDir: CLIENT_DIR,
//     defaultLayout: "main",
// }));
// app.set('views', CLIENT_DIR);
// // view engine set
// app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('login/login');
})

app.post('/products', function(req, res) {
    validator.validate(Constants.LABEL_PRODUCT_ITEM, req.body);
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

app.post('/login', function(req, res) {
    if (req.body.username === 'sangeet' && req.body.password === 'manghnani') {
        res.redirect('/categories');
        res.end();
    } else {
        res.redirect('/');
        res.end();
    }
});

app.get('/categories', function(req, res) {
    res.render('categories/categories');
})

module.exports = app;