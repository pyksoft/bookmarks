import helper from './_controllerHelper';
import dataRepository from '../repositories/dataRepository';
import importRepository from '../repositories/importRepository';
import * as multiparty from 'multiparty';

export default {
    getBookmarks,
    deleteBookmark,
    saveBookmark,
    deleteBookmarks,
    statistic,
    importBrowserBookmarks,
    addTagsForMultipleBookmarks,
    restoreBookmark
};

function getBookmarks(req, res) {
    let data = req.query;

    let searchQuery = {
        activePage: parseInt(data.activePage),
        sortBy: data.sortBy,
        sortAsc: data.sortAsc === 'true',
        searchStr: data.searchStr,
        searchMode: data.searchMode,
        searchTags: JSON.parse(data.searchTags),
        pageSize: parseInt(data.pageSize)
    };

    dataRepository.getBookmarks(searchQuery)
        .then((data) => {
            return helper.sendData(data, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function deleteBookmark(req, res) {
    let bookmarkId = parseInt(req.params.id);

    dataRepository.deleteBookmark(bookmarkId)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function saveBookmark(req, res) {
    let bookmark = req.body.bookmark;

    dataRepository.saveBookmark(bookmark)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function deleteBookmarks(req, res) {
    let ids = req.body.ids;

    dataRepository.deleteMultipleBookmarks(ids)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function statistic(req, res) {
    dataRepository.getStatistic()
        .then((data) => {
            return helper.sendData({data}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

async function importBrowserBookmarks(req, res) {
    try {
        let files: any = await parseFiles(req);

        let filePath = files.bookmarks[0].path;

        let importResults = await importRepository.importBrowserBookmarks(filePath);

        return helper.sendData(importResults, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

function parseFiles(req) {
    return new Promise((resolve, reject) => {
        var form = new multiparty.Form();

        form.parse(req, function (err, fields, files) {
            if (err) return reject(err);

            return resolve(files);
        });
    });
}

function addTagsForMultipleBookmarks(req, res) {
    let ids = req.body.ids;
    let selectedTags = req.body.selectedTags;

    dataRepository.addTagsForMultipleBookmarks(ids, selectedTags)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}

function restoreBookmark(req, res) {
    let bookmarkId = req.body.id;

    dataRepository.restoreBookmark(bookmarkId)
        .then(() => {
            return helper.sendData({}, res);
        })
        .catch((err) => {
            return helper.sendFailureMessage(err, res);
        });
}