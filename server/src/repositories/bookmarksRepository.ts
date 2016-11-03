const low = require('lowdb');

const db = low('../../data/db.json', {
    storage: require('lowdb/lib/file-async')
});

export default {
    getBookmarks,
    deleteBookmark
}

function getBookmarks() {
    const bookmarks = db.get('bookmarks').value();

    return Promise.resolve(bookmarks);
}

function deleteBookmark(id) {
    db.get('bookmarks')
        .find({ id: id })
        .assign({ isDeleted: true })
        .value();

    return Promise.resolve(null);
}