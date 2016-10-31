"use strict";
var winston = require('winston');
var config_1 = require('./config');
var errorLogger = null;
exports.__esModule = true;
exports["default"] = {
    error: logError
};
function initLoggers() {
    var getTransportFile = function (logFileName) {
        return new winston.transports.File({ filename: pathHelper.getDataRelative('logs', logFileName) });
    };
    performanceLogger = new (winston.Logger)({
        transports: [
            getTransportFile('performance.log')
        ]
    });
    errorLogger = new (winston.Logger)({
        transports: [
            getTransportFile('errors.log')
        ]
    });
    winston.handleExceptions((new (winston.transports.Console)()), getTransportFile('errors.log'));
    infoLogger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            getTransportFile('info.log')
        ]
    });
}
initLoggers();
function logTimeStart(timerName) {
    if (!config_1["default"].app.isDevLocal)
        return;
    if (performanceCache[timerName])
        throw new AppError('Timer was already created. Timer name: ' + timerName);
    performanceCache[timerName] = new Date().getTime();
}
function logTimeEnd(timerName) {
    if (!config_1["default"].app.isDevLocal)
        return;
    if (!performanceCache[timerName])
        throw new AppError('Timer was not previously created. Timer name: ' + timerName);
    var endTime = new Date().getTime();
    var startTime = performanceCache[timerName];
    var ms = endTime - startTime;
    performanceLogger.info('Timer ' + timerName + ': ' + moment.utc(ms).format('HH:mm:ss.SSS'));
    performanceCache = _.omit(performanceCache, timerName);
}
function logError(err) {
    if (_.isError(err)) {
        errorLogger.error('Error', { errorMessage: err.message, stack: err.stack });
        return;
    }
    errorLogger.error(err);
}
function logInfo(message) {
    infoLogger.info(message);
}
function logMessage(message, metadata) {
    infoLogger.info(message, metadata);
}
//# sourceMappingURL=logger.js.map