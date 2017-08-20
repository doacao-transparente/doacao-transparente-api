'use strict'

var env = require('../config/dev_env');
var host = env.peers[0].api_host;
var port = env.peers[0].api_port;
var context = require('../config/context');
var protocol = env.dev ? 'http' : 'https';
const url = protocol + "://" + host + ":" + port;

/***************************************************************
 * Build the request Object
 * Param:   {Object} params - params for request
 * Returns: {Object} req - options for request (config/body)
 ***************************************************************/


exports.SETAMOUNT = (params) => {
    console.log('[REQ]SETAMOUNT:');
    console.log(params);
    return {
        method: 'POST',
        url: url + '/chaincode ',
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
                    "name": context.chaincodeId
                },
                "ctorMsg": {
                    "function": "setValueTransfered",
                    "args": [params]
                },
                "secureContext": context.secureContextId
            },
            "id": 1
        })
    }
}

exports.SETVALUETRANSFERED = (params) => {
    console.log('[REQ]SETAMOUNT:');
    console.log(params);
    return {
        method: 'POST',
        url: url + '/chaincode ',
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
                    "name": context.chaincodeId
                },
                "ctorMsg": {
                    "function": "setAmount",
                    "args": [params]
                },
                "secureContext": context.context.secureContextId
            },
            "id": 1
        })
    }
}

exports.SETSTATUSPROJECT = (params) => {
    console.log('[REQ]SETSTATUSPROJECT:');
    console.log(params);
    return {
        method: 'POST',
        url: url + '/chaincode ',
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
                    "name": context.chaincodeId
                },
                "ctorMsg": {
                    "function": "createProject",
                    "args": [JSON.stringify(params)]
                },
                "secureContext": context.secureContextId
            },
            "id": 1
        })
    }
}

exports.GETDONATIONSHISTORY = (params) => {
    console.log('[REQ]GETDONATIONSHISTORY:');
    console.log(params);
    return {
        method: 'POST',
        url: url + '/chaincode ',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            method: "query",
            params: {
                "type": 1,
                "chaincodeID": {
                    "name": context.chaincodeId
                },
                "ctorMsg": {
                    "function": "getDonationsHistory",
                    "args": [params]
                },
                "secureContext": context.secureContextId
            },
            "id": 1
        })
    }
}

exports.GETPROJECTBYID = (params) => {
    console.log('[REQ]GETPROJECTBYID:');
    console.log(params);
    return {
        method: 'POST',
        url: url + '/chaincode ',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            method: "query",
            params: {
                "type": 1,
                "chaincodeID": {
                    "name": context.chaincodeId
                },
                "ctorMsg": {
                    "function": "queryOverKeys",
                    "args": [params]
                },
                "secureContext": context.secureContextId
            },
            "id": 1
        })
    }
}

exports.GETALLPROJECTS = (params) => {
    console.log('[REQ]GETALLPROJECTS:');
    console.log(params);
    return {
        method: 'POST',
        url: url + '/chaincode ',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            method: "query",
            params: {
                "type": 1,
                "chaincodeID": {
                    "name": context.chaincodeId
                },
                "ctorMsg": {
                    "function": "getProjectsByRange",
                    "args": [""]
                },
                "secureContext": context.secureContextId
            },
            "id": 1
        })
    }
}

exports.REGISTRAR = (params) => {
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

exports.DEPLOY = (params) => {
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
                        "1"
                    ]
                },
                "secureContext": params
            },
            "id": 1
        })
    }
}