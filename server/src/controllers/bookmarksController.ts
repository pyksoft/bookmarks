import helper from './_controllerHelper';
import bookmarkRepository from '../repositories/bookmarksRepository';

export default {
    getBookmarks,
    deleteBookmark,
    saveBookmark,
    deleteBookmarks,
    statistic,
    importBrowserBookmarks,
    importBackupBookmarks,
    exportBookmarks,
    addTagsForMultipleBookmarks,
    restoreBookmark,
    changeDbPath,
    getDbPath
};

function getBookmarks(req, res) {
    bookmarkRepository.getBookmarks()
        .then((data) => {
            return helper.sendData({data}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function deleteBookmark(req, res) {
    let bookmarkId = parseInt(req.body.id);

    bookmarkRepository.deleteBookmark(bookmarkId)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function saveBookmark(req, res) {

}

function deleteBookmarks(req, res) {

}

function statistic(req, res) {

}

function importBrowserBookmarks(req, res) {

}

function importBackupBookmarks(req, res) {

}

function exportBookmarks(req, res) {

}

function addTagsForMultipleBookmarks(req, res) {

}

function restoreBookmark(req, res) {

}

function changeDbPath(req, res) {

}

function getDbPath(req, res) {

}