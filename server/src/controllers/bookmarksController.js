"use strict";
var _controllerHelper_1 = require('./_controllerHelper');
exports.__esModule = true;
exports["default"] = {
    getBookmarks: getBookmarks
};
function getBookmarks(req, res) {
    Promise.resolve([1, 2, 3])
        .then(function (data) {
        return _controllerHelper_1["default"].sendData({ data: data }, res);
    })
        .catch(function (err) {
        return _controllerHelper_1["default"].sendFailureMessage(err, res);
    });
}
//# sourceMappingURL=bookmarksController.js.map