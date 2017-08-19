//TO DO montar roteamento e atribuições de acordo com o participante que executa a chamada (current)
'use strict'

var rest = require('../providers/api')();
var models = require('../models/model');
var Promise = require('promise');
var secureContextIdGlobal;
var chaincodeIdGlobal;

module.exports = () => {

    let createProject = (project) => {
        return new Promise((resolve, reject) => {
            let x = {
                project: project,
                secureContextId: secureContextIdGlobal,
                chaincodeId: chaincodeIdGlobal
            };
            rest.createProject(x)
                .then((msg) => {
                    console.log(`[APPCONTROLLER] createProject${msg}`);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    let setup = (users) => {
        return new Promise((resolve, reject) => {
            /****************************************************************************************
             *Param:  {JSONArray} users - set of auth keys to be registered/enrolled to Membership Services
             *Returns: {String} secureContextId - users's enrollmentId authorized to perform operations over network
             ****************************************************************************************/
            rest.registrar(users)
                .then((secureContextId) => {
                    console.log(`[APPCONTROLLER] Registrar ${secureContextId}`);
                    secureContextIdGlobal = secureContextId;
                    /**********************************************************************************************************
                     *Param: {String} secureContextId - users's enrollmentId authorized to perform operations over network
                     *Returns: {Object} isReady - contains secureContext and chaincodeId 
                     **********************************************************************************************************/
                    rest.deploy(secureContextId)
                        .then((isReady) => {
                            console.log(`[APPCONTROLLER] Deploy ${isReady}`);
                            chaincodeIdGlobal = isReady.chaincodeId;
                            /**********************************************************************************************************
                             *Param: {Object} isReady - contains secureContext and chaincodeId 
                             *Returns: {String} msg - currently status for network reset
                             **********************************************************************************************************/
                            rest.resetEverything(isReady)
                                .then((msg) => {
                                    console.log(`[APPCONTROLLER] resetEverything ${msg}`);

                                    /**********************************************************************************************************
                                     *Param: {Object} isReady - contains secureContext and chaincodeId 
                                     *Param: {Object} model - Model attributes for each participant
                                     *Returns: {Bool} finished - final status for network setup
                                     **********************************************************************************************************/
                                    // rest.createObjects(isReady, models)
                                    //     .then((finished) => {
                                    //         console.log(`[APPCONTROLLER] createObjects ${finished}`);
                                    //         resolve(finished);
                                    //     })
                                    //     .catch((err) => {
                                    //         reject(err);
                                    //     });

                                }).catch((err) => {
                                    reject(err);
                                });

                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    let objects = {
        setup: setup,
        createProject: createProject
    }

    return objects;
}