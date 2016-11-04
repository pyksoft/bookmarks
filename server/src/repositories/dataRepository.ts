import * as jsonfile from 'jsonfile';
import helper from './repositoryHelper';

const dbPath = './server/data/db.json';
const jsonData = jsonfile.readFileSync(dbPath);
const settings = {
    PAGE_SIZE: 15
};

export default {
    getBookmarks,
    saveBookmark,
    deleteBookmark,
    restoreBookmark,
    deleteMultipleBookmarks,
    addTagsForMultipleBookmarks,
    getStatistic,
    getTags,
    deleteTag,
    saveTag
}

function saveData() {
    return new Promise((resolve, reject) => {
        jsonfile.writeFile(dbPath, jsonData, function (err) {
            if (err) return reject(err);

            return resolve(null);
        })
    });
}

function getBookmarks(searchQuery) {
    let bookmarks = filterBookmarks(jsonData.bookmarks, searchQuery.searchMode, searchQuery.searchTags);

    bookmarks = helper.searchList(bookmarks, searchQuery.searchStr, ['title', 'url']);

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

    return saveData();
}

function addBookmark(bookmark) {
    let tagIds = bookmark.tags.map(t => t.id);

    let newBookmark = Object.assign({}, bookmark, {tags: tagIds});

    helper.addToList(jsonData.bookmarks, newBookmark);

    return saveData();
}

function deleteBookmark(id) {
    let bookmarks = jsonData.bookmarks;

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === id) {
            bookmarks[i].isDeleted = true;
        }
    }

    return saveData();
}

function restoreBookmark(id) {
    let bookmarks = jsonData.bookmarks;

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === id) {
            bookmarks[i].isDeleted = false;
        }
    }

    return saveData();
}

function deleteMultipleBookmarks(ids) {
    for (let i = 0; i < ids.length; i++) {
        deleteBookmark(ids[i]);
    }

    return saveData();
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

    return saveData();
}

function getStatistic() {
    let bookmarks = jsonData.bookmarks;

    let deletedBookmarks = bookmarks.filter(bookmark => {
        return bookmark.isDeleted;
    });

    let taggedBookmarks = bookmarks.filter(bookmark => {
        return bookmark.tags.length;
    });

    return Promise.resolve({
        totalBookmarksCount: bookmarks.length,
        taggedBookmarksCount: taggedBookmarks.length,
        deletedBookmarksCount: deletedBookmarks.length
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

    return saveData();
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

    return saveData();
}

function updateTag(tag) {
    let tags = jsonData.tags;

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].id === tag.id) {
            tags[i] = tag;
        }
    }

    return saveData();
}

function filterBookmarks(list, mode, tags) {
    let result = list.filter(bookmark => {
        return (mode === 'deleted') ? bookmark.isDeleted : !bookmark.isDeleted;
    });

    switch (mode) {
        case 'no_tags':
            result = list.filter(bookmark => {
                return bookmark.tags.length === 0;
            });
            break;
        case 'tag_selection':
            let tagIds = tags.map(t => t.value);

            result = list.filter(bookmark => {
                let selectedTags = bookmark.tags.filter(id => {
                    return tagIds.indexOf(id) !== -1;
                });

                return selectedTags.length > 0;
            });
            break;
        default:
            break;
    }

    return result;
}