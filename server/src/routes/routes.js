"use strict";
var bookmarksController_1 = require('../controllers/bookmarksController');
exports.__esModule = true;
exports["default"] = {
    init: initRoutes
};
function initRoutes(app) {
    app.get('/api/bookmarks', bookmarksController_1["default"].getBookmarks);
}
//# sourceMappingURL=routes.js.map