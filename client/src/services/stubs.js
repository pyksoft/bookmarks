import jsonData from '../../db.json';
import helper from '../helpers/stubsHelper';

export default {
    getBookmarks,
    saveBookmark,
    getTags,
    deleteTag,
    saveTag
}

const pageSize = 15;

function getBookmarks(searchQuery) {

    let bookmarks = helper.searchList(jsonData.bookmarks, searchQuery.searchStr, ['title', 'url']);

    bookmarks = helper.sortList(bookmarks, searchQuery.sortBy, searchQuery.sortAsc, [
        {name: 'title', type: 'string'},
        {name: 'creationDate', type: 'date'},
        {name: 'lastEditDate', type: 'date'}
    ]);

    let result = helper.getPage(bookmarks, searchQuery.activePage, pageSize);

    result = generateBookmarks(result);

    return Promise.resolve({
        total: bookmarks.length,
        dataItems: result
    });
}

function saveBookmark(bookmark) {
    if (bookmark.id) {
        console.log('todo');
        return Promise.resolve(null);
    } else {
        return addBookmark(bookmark);
    }
}

function addBookmark(bookmark) {
    let tagIds = bookmark.tags.map(t => t.id);

    let newBookmark = Object.assign({}, bookmark, {tags: tagIds});

    helper.addToList(jsonData.bookmarks, newBookmark);

    return Promise.resolve(null);
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