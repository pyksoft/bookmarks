"use strict";
exports.__esModule = true;
exports["default"] = {
    sendData: sendData,
    sendFailureMessage: sendFailureMessage
};
function sendFailureMessage(error, res) {
    res.send({ 'status': 'failure', message: error });
}
function sendData(data, res) {
    data.status = 'success';
    res.send(data);
}
//# sourceMappingURL=_controllerHelper.js.map