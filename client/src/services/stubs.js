import jsonData from '../../db.json';
import helper from '../helpers/stubsHelper';
import settings from '../services/settingsService';

export default {
    getBookmarks,
    saveBookmark,
    deleteBookmark,
    deleteMultipleBookmarks,
    addTagsForMultipleBookmarks,
    getTags,
    deleteTag,
    saveTag
}

function getBookmarks(searchQuery) {

    let bookmarks = helper.searchList(jsonData.bookmarks, searchQuery.searchStr, ['title', 'url']);

    bookmarks = helper.sortList(bookmarks, searchQuery.sortBy, searchQuery.sortAsc, [
        {name: 'title', type: 'string'},
        {name: 'creationDate', type: 'date'},
        {name: 'lastEditDate', type: 'date'}
    ]);

    let result = helper.getPage(bookmarks, searchQuery.activePage, settings.PAGE_SIZE);

    result = generateBookmarks(result);

    return Promise.resolve({
        total: bookmarks.length,
        dataItems: result
    });
}

function saveBookmark(bookmark) {
    if (bookmark.id) {
        return updateBookmark(bookmark);
    } else {
        return addBookmark(bookmark);
    }
}

function updateBookmark(bookmark) {
    let tagIds = bookmark.tags.map(t => t.id);

    let newBookmark = Object.assign({}, bookmark, {tags: tagIds});

    let bookmarks = jsonData.bookmarks;

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === bookmark.id) {
            bookmarks[i] = newBookmark;
        }
    }

    return Promise.resolve(null);
}

function addBookmark(bookmark) {
    let tagIds = bookmark.tags.map(t => t.id);

    let newBookmark = Object.assign({}, bookmark, {tags: tagIds});

    helper.addToList(jsonData.bookmarks, newBookmark);

    return Promise.resolve(null);
}

function deleteBookmark(id) {
    let bookmarks = jsonData.bookmarks;

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === id) {
            bookmarks.splice(i, 1);
        }
    }

    return Promise.resolve(null);
}

function deleteMultipleBookmarks(ids) {
    for (let i = 0; i < ids.length; i++) {
        deleteBookmark(ids[i]);
    }
    
    return Promise.resolve(null);
}

function addTagsForMultipleBookmarks(ids, selectedTags) {
    let bookmarks = jsonData.bookmarks;
    let tagIds = selectedTags.map(t => t.value);

    for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < bookmarks.length; j++) {
            if (bookmarks[j].id === ids[i]) {
                let newBookmark = Object.assign({}, bookmarks[j], {tags: tagIds});

                bookmarks[j] = newBookmark;
            }
        }
    }

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
    if (tag.id) {
        return updateTag(tag);
    } else {
        return addTag(tag);
    }
}

function addTag(tag) {
    helper.addToList(jsonData.tags, tag);

    return Promise.resolve(null);
}

function updateTag(tag) {
    let tags = jsonData.tags;

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].id === tag.id) {
            tags[i] = tag;
        }
    }

    return Promise.resolve(null);
}