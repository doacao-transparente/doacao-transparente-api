'use strict'

var app = require('./config/express')();
var env = require('./config/bluemix_env');
var appStatusCode = require('./utils/ApplicationStatusCode');
var appController = require("./controllers/appController")(app);

try {
    appController.setup(env.users)
        .then((status) => {
            return status ?
                appStatusCode.Success :
                appStatusCode.Fail;
        }).catch((err) => {
            return err;
        });
} catch (error) {
    console.error(error);
}