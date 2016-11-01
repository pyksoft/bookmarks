import jsonData from '../../db.json';
import helper from '../helpers/stubsHelper';

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

    addTags(bookmarks);

    return Promise.resolve({
        total: bookmarks.length,
        dataItems: bookmarks
    });
}

function addTags(bookmarks) {
    let tagLookup = {};
    for (let tag of jsonData.tags) {
        tagLookup[tag.id] = tag;
    }

    for (let bookmark of bookmarks) {
        let tags = [];

        for (let tagId of bookmark.tags) {
            tags.push(tagLookup[tagId]);
        }

        bookmark.tags = tags;
    }
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
    throw new Error('This operation is not supported!');
}