import bookmarkController from '../controllers/bookmarkController';
import tagController from '../controllers/tagController';

export default {
    init: initRoutes
};

function initRoutes(app) {
    app.get('/api/bookmarks', bookmarkController.getBookmarks);
    app.delete('/api/bookmark/:id', bookmarkController.deleteBookmark);
    app.post('/api/saveBookmark', bookmarkController.saveBookmark);
    app.put('/api/deleteMultipleBookmarks', bookmarkController.deleteBookmarks);
    app.get('/api/statistic', bookmarkController.statistic);
    app.post('/api/import/browserBookmarks', bookmarkController.importBrowserBookmarks);
    app.post('/api/import/backupBookmarks', bookmarkController.importBackupBookmarks);
    app.post('/api/export/bookmarks', bookmarkController.exportBookmarks);
    app.put('/api/addTagsForMultipleBookmarks', bookmarkController.addTagsForMultipleBookmarks);
    app.post('/api/restoreBookmark', bookmarkController.restoreBookmark);

    app.post('/api/settings/changeDbPath', bookmarkController.changeDbPath);
    app.get('/api/settings/getDbPath', bookmarkController.getDbPath);

    app.get('/api/tags', tagController.getTags);
    app.delete('/api/tag/:id', tagController.deleteTag);
    app.post('/api/saveTag', tagController.saveTag);
}