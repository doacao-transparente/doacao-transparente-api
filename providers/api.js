'use strict'

var req = require('../services/requestObjectService')();
var Promise = require('promise');
var request = require('request-promise');

module.exports = () => {

    let registrar = (users) => {
        return new Promise((resolve, reject) => {

            let options = req.registrar(users[8]);
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

    let deploy = (secureContextId) => {
        return new Promise((resolve, reject) => {
            console.log(`[API] deploy ${secureContextId}`);
            let options = req.deploy(secureContextId);
            console.log(options);
            request(options)
                .then((response) => {

                    let id = JSON.parse(response);
                    let chaincodeId = id.result.message;
                    let isReady = {
                        chaincodeId: chaincodeId,
                        secureContextId: secureContextId
                    }
                    resolve(isReady);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    let resetEverything = (isReady) => {
        return new Promise((resolve, reject) => {
            console.log(`[API] resetEverything ${isReady}`);
            let options = req.reset(isReady);
            console.log(options);
            request(options)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    let createObjects = (isReady, models) => {
        return new Promise((resolve, reject) => {
            console.log(`[API] createObjects ${isReady} | ${models}`);
            let options = req.createObjects(isReady, models);
            console.log(options);
            request(options)
                .then((res) => {
                    let finished = res.message ? true : false;
                    resolve(finished);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    let objects = {
        registrar: registrar,
        deploy: deploy,
        resetEverything: resetEverything,
        createObjects: createObjects
    }

    return objects;

}