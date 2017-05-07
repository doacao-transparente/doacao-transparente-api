'use strict'

const bodyParser = require('body-parser');
const express = require('express');
// const cfenv = require('cfenv');

let app = express();

module.exports = () => {

    app.set('views', __dirname + '/../views/donation/www');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(express.static(__dirname + '/../public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/', (req, res) => res.redirect('/home'));

    app.get('/welcome', function (req, res) {
        res.render('welcome.html');
    });

    // get the app environment from Cloud Foundry
    //var appEnv = cfenv.getAppEnv(); / appEnv.port

    app.listen(3000, function () {
        console.log("server starting on " + 3000);
    });

    return app;

}