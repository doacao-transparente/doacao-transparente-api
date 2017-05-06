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

    let CREATEPROJECT = (params) => {
        console.log('[REQ]CREATEPROJECT:');
        console.log(params);
        return {
            method: 'POST',
            url: url + '/ ',
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
                        "function": "create_project",
                        "args": params.project
                    },
                    "secureContext": params.secureContextId
                },
                "id": 1
            })
        }
    }

    let REGISTRAR = (params) => {
        console.log('[REQ]REGISTRAR:');
        console.log(params);
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
        console.log('[REQ]DEPLOY:');
        console.log(params);
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
                            "99"
                            //params.args
                        ]
                    },
                    "secureContext": params
                },
                "id": 1
            })
        }
    }

    let RESET = (params) => {
        console.log('[REQ]RESET:');
        console.log(params);
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
        console.log('[REQ]CREATE:');
        console.log(params);
        console.log(models);
        let args = argsMap(models);
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
                        "args": [args]
                    },
                    "secureContext": params.secureContextId
                },
                "id": 1
            })
        }
    }

    let argsMap = (models) => {

        try {
            var companies = models.Company.map(company => {
                return [company.Id, company.Name, company.CNPJ, company.Tokens]
            });
            var ongs = models.ONG.map(ong => {
                return [ong.Id, ong.Name, ong.CNPJ, ong.Tokens]
            });

            let companyString = companies.join(',');
            let ongString = ongs.join(',');
            let args = companyString.concat(ongString);

            return args;
        } catch (err) {
            console.log(err);
        }
    }

    let methods = {
        registrar: REGISTRAR,
        deploy: DEPLOY,
        reset: RESET,
        createObjects: CREATEOBJECTS,
        createProject: CREATEPROJECT
    }
    return methods;

}