
module.exports = () => {

    //adicionar logger
    var cfenv = require('cfenv');
    var restify = require('restify');
    var app = restify.createServer();
    var bodyParser = require('body-parser');

    //adicionar funcionalidades genéricas das rotas(pagina de erro,sucesso,etc)
    var appEnv = cfenv.getAppEnv();

    app.use(bodyParser.json());
    app.listen(appEnv.port, '0.0.0.0', function () {
        // print a message when the server starts listening
        console.log("server starting on " + appEnv.url);
    });

    return app;
}
