var appController = require("../controllers/appController");

exports.config = (app) => {

    app.post('/setamount', appController.setAmount);

    app.get('/retrieveproject', appController.query);

    app.post('/saveproject', appController.saveproject);

    app.get('/getallprojects', appController.getAllProjects);

    app.get('/getprojectbyid/:id', appController.getProjectById);

    app.post('/setStatusproject', appController.setStatusProject);

    app.get('/getdonatorhistory/:id', appController.getDonatorHistory);

    app.get('/getdonationhistory/:id', appController.getDonationsHistory);

}