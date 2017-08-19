var appController = require("../controllers/appController")();

exports.config = (app) => {

    // app.post('/setamount', appController.setAmount);

    app.post('/createproject', appController.createProject);

    // app.get('/getprojectbyid', appController.getProjectById);

    // app.get('/getallprojects', appController.getAllProjects);

}