var env = require('./config/dev_env');
var appSetup = require("./utils/setup");
var router = require('./routes/apiRouter');
var app = require('./config/routerSetup')();
var appStatusCode = require('./utils/ApplicationStatusCode');

try {
    router.config(app);
    appSetup.load(env)
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