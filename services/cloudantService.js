const Cloudant = require('cloudant');
const config = require("../config/cloudant");

var cloudant = Cloudant("https://" + config.account + ":" + config.password + "@" + config.host);
cloudant.db.use(config.database);

exports.save = (params) => {

    return new Promise((resolve, reject) => {

        cloudant.insert(params, () => {

        });
    });

}

exports.query = (params) => {

    return new Promise((resolve, reject) => {

        cloudant.get(params, () => {

        });
    });

}