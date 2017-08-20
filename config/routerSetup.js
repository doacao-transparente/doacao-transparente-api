
/*Express basic configuration as module */
var appController = require("../controllers/appController");
module.exports = function () {

    const bodyParser = require('body-parser');
    const express = require('express');
    const logger = require('morgan');
    var cfenv = require('cfenv');
    const app = express();

    var appEnv = cfenv.getAppEnv();

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.listen(appEnv.port, '0.0.0.0', function () {
        // print a message when the server starts listening
        console.log("server starting on " + appEnv.url);
    });

    app.post('/setamount', appController.setAmount);
    app.post('/retrieveproject', appController.query);
    app.post('/saveproject', appController.saveproject);
    app.post('/getallprojects', appController.getAllProjects);
    app.post('/getprojectbyid', appController.getProjectById);
    app.post('/setStatusproject', appController.setStatusProject);
    app.post('/getdonatorhistory', appController.getDonatorHistory);
    app.post('/getDonationsHistory', appController.getDonationsHistory);

    return app;

}
