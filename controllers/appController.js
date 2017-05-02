//TO DO montar roteamento e atribuições de acordo com o participante que executa a chamada (current)
'use strict'

var rest = require('../providers/api')();
var models = require('../models/model');
var Promise = require('promise');

module.exports = (app) => {

    let setup = (users) => {
        return new Promise((resolve, reject) => {

            /****************************************************************************************
             *Param:  {JSONArray} users - set of auth keys to be registered/enrolled to Membership Services
             *Returns: {String} secureContextId - users's enrollmentId authorized to perform operations over network
             ****************************************************************************************/
            rest.registrar(users)
                .then((secureContextId) => {

                    /**********************************************************************************************************
                     *Param: {String} secureContextId - users's enrollmentId authorized to perform operations over network
                     *Returns: {Object} isReady - contains secureContext and chaincodeId 
                     **********************************************************************************************************/
                    rest.deploy(secureContextId)
                        .then((isReady) => {

                            /**********************************************************************************************************
                             *Param: {Object} isReady - contains secureContext and chaincodeId 
                             *Returns: {String} msg - currently status for network reset
                             **********************************************************************************************************/
                            rest.resetEverything(isReady)
                                .then((msg) => {
                                    console.log(msg);

                                    /**********************************************************************************************************
                                     *Param: {Object} isReady - contains secureContext and chaincodeId 
                                     *Param: {Object} model - Model attributes for each participant
                                     *Returns: {Bool} finished - final status for network setup
                                     **********************************************************************************************************/
                                    rest.createObjects(isReady, models)
                                        .then((finished) => {
                                            resolve(finished);
                                        })
                                        .catch((err) => {
                                            reject(err);
                                        });

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
        setup: setup
    }

    return objects;
}