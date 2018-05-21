var admin = require('firebase-admin');
var jsonfile = require('jsonfile');
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var configTemplateEngine = require('./src/server/config/express-template-engine');
var validator = require('./src/server/data/validationFramework');
var Constants = require('./src/server/Constants');

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

module.exports.db = admin.firestore();
var app = express();
var router = express.Router();
app.listen(8000);
app.use('/', router);

var routes = require('./src/server/routes');

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

app.post('/login', function(req, res) {
    if (req.body.username === 'sangeet' && req.body.password === 'manghnani') {
        res.redirect('/categories');
        res.end();
    } else {
        res.redirect('/');
        res.end();
    }
});


require('./src/server/routes')(router);