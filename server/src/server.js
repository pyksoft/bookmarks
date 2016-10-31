"use strict";
var express_1 = require('express');
//import morgan from 'morgan';
var body_parser_1 = require('body-parser');
var cors_1 = require('cors');
var config_1 = require('./config');
var routes_1 = require('./routes/routes');
var logger_1 = require('./logger');
var app = express_1["default"]();
exports.__esModule = true;
exports["default"] = {
    start: start
};
function start(options) {
    initExpress();
    routes_1["default"].init(app);
    //should be after routes.init
    initErrorHandling(app);
    app.listen(config_1["default"].port, function () {
        console.log("Server is listening on port " + config_1["default"].port + "!");
    });
}
function initExpress() {
    if (config_1["default"].isDevLocal)
        app.use(morgan('dev')); //log requests
    app.use(body_parser_1["default"].json()); // get information from html forms
    app.use(body_parser_1["default"].urlencoded({ extended: true }));
    //TODO add
    //app.use('/static', express.static(pathHelper.getRelative('../client/build/static')));
    app.use(cors_1["default"]());
}
function initErrorHandling(app) {
    //log unhandled errors
    app.use(function (err, req, res, next) {
        logger_1["default"].error(err);
        console.log(err);
        var message = _.isError(err) ? err.message : err;
        message = config_1["default"].isDevLocal ? message : 'Server Error';
        res.status(500).send({ error: message });
    });
    process.on('uncaughtException', function (err) {
        logger_1["default"].error(err);
    });
}
//# sourceMappingURL=server.js.map