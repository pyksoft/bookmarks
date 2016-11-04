import httpHelper from '../helpers/httpHelper';
import settingsService from './settingsService';

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

function getBookmarks(searchQuery) {
    let data = {
        activePage: searchQuery.activePage,
        sortBy: searchQuery.sortBy,
        sortAsc: searchQuery.sortAsc,
        searchStr: searchQuery.searchStr,
        searchMode: searchQuery.searchMode,
        searchTags: JSON.stringify(searchQuery.searchTags),
        pageSize: settingsService.PAGE_SIZE
    };
    
    return httpHelper.get('/api/bookmarks', data)
        .then((jsonData) => {
            return {
                total: jsonData.data.total,
                dataItems: jsonData.data.dataItems
            }
        });
}

function saveBookmark(bookmark) {
    return httpHelper.post('/api/saveBookmark', {bookmark});
}

function deleteBookmark(id) {
    return httpHelper.delete('/api/bookmark/' + id);
}

function restoreBookmark(id) {
    return httpHelper.post('/api/restoreBookmark', {id});
}

function deleteMultipleBookmarks(ids) {
    return httpHelper.put('/api/deleteMultipleBookmarks', {ids});
}

function addTagsForMultipleBookmarks(ids, selectedTags) {
    let data = {
        ids,
        selectedTags
    };
    
    return httpHelper.put('/api/addTagsForMultipleBookmarks', data);
}

function getStatistic() {
    return httpHelper.get('/api/statistic')
        .then((jsonData) => {
            return jsonData.data;
        });
}

function getTags() {
    return httpHelper.get('/api/tags')
        .then((jsonData) => {
            return jsonData.tags;
        });
}

function deleteTag(id) {
    return httpHelper.delete('/api/tag/' + id);
}

function saveTag(tag) {
    return httpHelper.post('/api/saveTag', {tag});
}