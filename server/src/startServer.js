"use strict";
process.on('uncaughtException', function (err) {
    var stack = err.stack;
    console.log("Uncaught exception. " + err);
});
var server_1 = require('./server');
server_1["default"].start({});
//# sourceMappingURL=startServer.js.map