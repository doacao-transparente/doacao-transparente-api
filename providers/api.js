'use strict'


var req = require('../services/requestObjectService')();
var Promise = require('promise');
var request = require('request');

module.exports = () => {

    let registrar = (users) => {
        return new Promise((resolve, reject) => {
            let options = req.registrar(users[8]);
            request(options)
                .then((isEnrolled) => {
                    resolve(isEnrolled);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    let deploy = (secureContextId) => {
        return new Promise((resolve, reject) => {
            let options = req.deploy(secureContextId);
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
            let options = req.reset(isReady);
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
            let options = req.createObjects(isReady, models);
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

}