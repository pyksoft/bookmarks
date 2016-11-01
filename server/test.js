const low = require('lowdb');

const db = low('./data/db.json', {
    storage: require('lowdb/lib/file-async')
});

const bookmarks = db.get('bookmarks')
    .filter(x => x.title === 'bookmark3')
    .value();

console.log(bookmarks);

