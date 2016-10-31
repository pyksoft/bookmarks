import bookmarksController from '../controllers/bookmarksController';

export default {
    init: initRoutes
};

function initRoutes(app) {
    app.get('/api/bookmarks', bookmarksController.getBookmarks);
}