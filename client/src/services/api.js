import httpHelper from '../helpers/httpHelper';

export default {
    getBookmarks,
    getTags,
    deleteTag,
    saveTag
}

function getBookmarks(page, sortBy, searchStr) {
    if (!searchStr) searchStr = '';

    return httpHelper.get(`/bookmarks?_page=${page}&_sort=${sortBy}&q=${searchStr}`)
        .then((jsonData) => {
            return {
                //total: response.headers.get('x-total-count'), // TODO
                total: jsonData.length,
                dataItems: jsonData
            }
        });
}

function getTags() {
    return httpHelper.get('/tags');
}

function deleteTag(id) {
    let data = {id};

    return httpHelper.delete('/api/tag', data);
}

function saveTag(tag) {
    return httpHelper.post('/api/saveTag', {tag});
}