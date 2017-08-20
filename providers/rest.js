const request = require('request-promise');
var requestfy = require('../utils/requestfy');

exports.setStatusProject = (params) => {
    return new Promise((resolve, reject) => {
        console.log('REST.js setStatusPorject');
        let options = requestfy.SETSTATUSPROJECT(params);
        console.log(options);
        request(options)
            .then((success) => {
                console.log(`[API] promoteProject`);
                resolve(success);
            })
            .catch((err) => {
                console.log(`[API] promoteProject : ERROR`);
                reject(err);
            });
    });
}

exports.setAmount = (params) => {
    return new Promise((resolve, reject) => {

        let options = requestfy.SETAMOUNT(params);
        request(options)
            .then((success) => {
                console.log(`[API] setAmount`);
                resolve(success);
            })
            .catch((err) => {
                console.log(`[API] setAmount : ERROR`);
                reject(err);
            });
    });
}

exports.setValueTransfered = (params) => {
    return new Promise((resolve, reject) => {

        let options = requestfy.SETVALUETRANSFERED(params);
        request(options)
            .then((success) => {
                console.log(`[API] setValueTransfered`);
                resolve(success);
            })
            .catch((err) => {
                console.log(`[API] setValueTransfered : ERROR`);
                reject(err);
            });
    });
}

exports.getDonationsHistory = (params) => {
    return new Promise((resolve, reject) => {

        let options = requestfy.GETDONATIONSHISTORY(params);
        request(options)
            .then((success) => {
                console.log(`[API] getDonationsHistory`);
                resolve(success);
            })
            .catch((err) => {
                console.log(`[API] getDonationsHistory : ERROR`);
                reject(err);
            });
    });
}

exports.getProjectById = (params) => {
    return new Promise((resolve, reject) => {

        let options = requestfy.GETPROJECTBYID(params);
        request(options)
            .then((success) => {
                console.log(`[API] getprojectbyid`);
                resolve(success);
            })
            .catch((err) => {
                console.log(`[API] getprojectbyid : ERROR`);
                reject(err);
            });
    });
}

exports.getallprojects = () => {
    return new Promise((resolve, reject) => {

        let options = requestfy.GETALLPROJECTS();
        request(options)
            .then((success) => {
                console.log(`[API] getallprojects`);
                resolve(success);
            })
            .catch((err) => {
                console.log(`[API] getallprojects : ERROR`);
                reject(err);
            });
    });
}