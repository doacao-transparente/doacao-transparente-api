//TO DO montar roteamento e atribuições de acordo com o participante que executa a chamada (current)
'use strict'

var rest = require('../providers/rest');
var chaincodeContext = require('../config/context');
var cloudantService = require('../services/cloudantService');

exports.setStatusProject = (req, res) => {

    rest.setStatusProject(req.body)
        .then((success) => {
            console.log("[APPCONTROLLER] createProject");
            console.log(success);
            res.send(success);
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
}

exports.setAmount = (req, res) => {

    rest.setAmount(req.body)
        .then((success) => {
            console.log("[APPCONTROLLER] setAmount");
            console.log(success);
            res.send(success);
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
}

exports.getDonationsHistory = (req, res) => {

    rest.getDonationsHistory(req.params.id)
        .then((success) => {
            console.log("[APPCONTROLLER] getDonationsHistory");
            console.log(success);
            res.send(success);
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
}

exports.getProjectById = (req, res) => {

    rest.getProjectById(req.body)
        .then((success) => {
            console.log("[APPCONTROLLER] getprojectbyid");
            console.log(success);
            res.send(success);
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
}

exports.getAllProjects = (req, res) => {

    rest.getallprojects(req.body)
        .then((success) => {
            console.log("[APPCONTROLLER] getallprojects");
            console.log(success);
            res.send(success);
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send(err);
        });
}

exports.query = (req, res) => {

}

exports.saveproject = (req, res) => {

}

exports.getDonatorHistory = (req, res) => {

}