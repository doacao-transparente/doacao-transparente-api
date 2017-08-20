const fs = require('fs');
const request = require('request-promise');
const requestfy = require('../utils/requestfy');

exports.load = (env) => {

    return new Promise((resolve, reject) => {
        let options = requestfy.REGISTRAR(env.users[8]);
        console.log('registrando');
        console.log(options);
        request(options).then((secureContextId) => {

            console.log('SecureContext:');
            console.log(secureContextId);

            deploy(secureContextId)
                .then((isReady) => {

                    console.log('chaincode successfully deployed :)');

                    isReady.secureContextId = env.users[8].enrollSecret;
                    console.log(isReady);
                    saveContext(isReady);

                    resolve(isReady.chaincodeId);

                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });

        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

function deploy(secureContextId) {
    return new Promise((resolve, reject) => {

        let options = requestfy.DEPLOY(secureContextId);
        console.log(options);

        request(options)
            .then((response) => {

                let id = JSON.parse(response);
                console.log('deploy request');
                console.log(response);
                let chaincodeId = id.result.message;
                let isReady = {
                    chaincodeId: chaincodeId,
                    secureContextId: secureContextId
                }
                console.log('deployed');
                resolve(isReady);
            })
            .catch((err) => {
                console.log('Error deploying chaincode');
                console.log(err);
                reject(err);
            });
    });
}

function registrar(users) {
    return new Promise((resolve, reject) => {

        let options = requestfy.registrar(users[8]);
        console.log(options);
        request(options)
            .then((isEnrolled) => {
                console.log(`[API] Registrar`);
                console.log(isEnrolled);
                resolve(users[8].enrollId);
            })
            .catch((err) => {
                console.log(`[API] Registrar : ERROR`);
                console.log(err);
                reject(err);
            });
    });
}

function saveContext(context) {

    fs.writeFileSync("./config/context.json", JSON.stringify(context), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}