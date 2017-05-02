'use strict'

var env = require('../config/bluemix_env.json');
var host = env.peers[0].api_host;
var port = env.peers[0].api_port;
var protocol = env.dev ? 'http' : 'https';
const url = protocol + "://" + host + ":" + port;

/***************************************************************
 * Build the request Object
 * Param:   {Object} params - params for request
 * Returns: {Object} req - options for request (config/body)
 ***************************************************************/
module.exports = () => {

    let REGISTRAR = (params) => {
        return {
            method: 'POST',
            url: url + '/registrar',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "enrollId": params.enrollId,
                "enrollSecret": params.enrollSecret
            })
        }
    }

    let DEPLOY = (params) => {
        return {
            method: 'POST',
            url: url + '/chaincode',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                method: "deploy",
                params: {
                    "type": 1,
                    "chaincodeID": {
                        "path": env.chaincodePath
                    },
                    "ctorMsg": {
                        "function": "init",
                        "args": [
                            params.args
                        ]
                    },
                    "secureContext": params.secureContextId
                },
                "id": 1
            })
        }
    }

    let RESET = (params) => {
        return {
            method: 'POST',
            url: url + '/chaincode',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                method: "invoke",
                params: {
                    "type": 1,
                    "chaincodeID": {
                        "name": params.chaincodeId
                    },
                    "ctorMsg": {
                        "function": "resetAll",
                        "args": []
                    },
                    "secureContext": params.secureContextId
                },
                "id": 1
            })
        }
    }

    let CREATEOBJECTS = (params, models) => {

        var args = models.Company.map(company => {
            return models.ONG.map(ong => {
                [
                    company.Id, company.Name, company.CNPJ, company.Tokens,
                    ong.Id.ong.Name.ong.CNPJ, ong.Tokens
                ]
            })
        });

        console.log(args);

        return {
            method: 'POST',
            url: url + '/chaincode',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                method: "invoke",
                params: {
                    "type": 1,
                    "chaincodeID": {
                        "name": params.chaincodeId
                    },
                    "ctorMsg": {
                        "function": "initdemo",
                        "args": args
                    },
                    "secureContext": params.secureContextId
                },
                "id": 1
            })
        }
    }

    let methods = {
        registrar: REGISTRAR,
        deploy: DEPLOY,
        reset: RESET,
        createObjects: CREATEOBJECTS
    }
    return methods;

}