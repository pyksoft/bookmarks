const low = require('lowdb');

const db = low('../../data/db.json', {
    storage: require('lowdb/lib/file-async')
});

export default {
    getBookmarks
}

function getBookmarks() {
    const bookmarks = db.get('bookmarks').value();

    return Promise.resolve(bookmarks);
}