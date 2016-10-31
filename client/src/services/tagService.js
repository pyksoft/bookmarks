import httpHelper from '../helpers/httpHelper';

export default {
    getTags,
    deleteTag,
    saveTag
};

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