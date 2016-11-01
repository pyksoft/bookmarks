import jsonData from '../../db.json';
import helper from '../helpers/stubsHelper';
import toastr from 'toastr';

export default {
    getBookmarks,
    getTags,
    deleteTag,
    saveTag
}

const pageSize = 10;

function getBookmarks(page, sortBy, isAsc, searchStr) {
    let bookmarks = helper.searchList(jsonData.bookmarks, searchStr, ['title', 'url']);

    bookmarks = helper.sortList(bookmarks, sortBy, isAsc, [
        {name: 'title', type: 'string'},
        {name: 'creationDate', type: 'date'},
        {name: 'lastEditDate', type: 'date'},
    ]);

    bookmarks = helper.getPage(bookmarks, page, pageSize);

    return Promise.resolve({
        total: bookmarks.length,
        dataItems: bookmarks
    });
}

function getTags() {
    return Promise.resolve(jsonData.tags);
}

function deleteTag(id) {
    notImplemented();
}

function saveTag(tag) {
    notImplemented();
}

function notImplemented() {
    toastr.warning('This operation is not supported!');
}