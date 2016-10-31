import httpHelper from '../helpers/httpHelper';

export default {
    getBookmarks
};

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