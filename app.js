var app = require('./config/routerSetup')();
var env = require('./config/bluemix_env');
var router = require('./routes/apiRouter');
var appController = require("./controllers/appController")();
var appStatusCode = require('./utils/ApplicationStatusCode');

try {
    router.config(app);
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
}