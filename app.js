
var app = require('./config/express')();
/*var env = require('./config/bluemix_env');
var appStatusCode = require('./utils/ApplicationStatusCode');
var appController = require("./controllers/appController")(app);

try {
    appController.setup(env.users)
        .then((status) => {
            return status ?
                console.log(appStatusCode.Success) :
                console.log(appStatusCode.Fail);
        }).catch((err) => {
            return err;
        });
} catch (error) {
    console.error(error);
}*/