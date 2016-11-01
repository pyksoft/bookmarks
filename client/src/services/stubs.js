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

    let result = helper.getPage(bookmarks, page, pageSize);

    result = generateBookmarks(result);

    return Promise.resolve({
        total: bookmarks.length,
        dataItems: result
    });
}

function generateBookmarks(bookmarks) {
    let result = [];

    let tagLookup = {};
    for (let tag of jsonData.tags) {
        tagLookup[tag.id] = tag;
    }

    for (let bookmark of bookmarks) {
        let tags = [];

        for (let tagId of bookmark.tags) {
            tags.push(tagLookup[tagId]);
        }

        result.push(Object.assign({}, bookmark, {
            tags,
            isTagged: tags.length ? true: false
        }));
    }

    return result;
}

function getTags() {
    let result = [];

    for (let tag of jsonData.tags) {
        result.push(Object.assign({}, tag));
    }

    return Promise.resolve(result);
}

function deleteTag(id) {
    helper.deleteFromList(jsonData.tags, (tag) => tag.id === id);

    for (let bookmark of jsonData.bookmarks) {
        helper.deleteFromList(bookmark.tags, (tagId) => tagId === id);
    }

    return Promise.resolve(null);
}

function saveTag(tag) {
    notImplemented();
}

function notImplemented() {
    throw new Error('This operation is not supported!');
}