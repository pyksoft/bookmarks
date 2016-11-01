export default {
    searchList,
    sortList,
    getPage
}

function searchList(list, searchStr, fields) {
    if (!searchStr) return list;

    return list.filter(movie => {
        for (let field of fields) {
            if (containsString(list[field], searchStr)) return true;
        }

        return false;
    });
}

function sortList(list, sortBy, isAsc, fields) {
    for (let field of fields) {
        if (field.name === sortBy) {
            list.sort(getSortFunction(field.name, field.type, isAsc));
        }
    }

    return list;
}

function getSortFunction(field, type, isAsc) {
    switch (type){
        case 'string':
            return (x, y) => x[field].localeCompare(y[field]);
        case 'number':
            return (x, y) => x[field] - y[field];
        default:
            return (x, y) => 0;
    }
}

function containsString(obj, searchStr) {
    return obj.toString().toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
}

function getPage(list, page, perPage) {
    var start = (page - 1) * perPage;
    var end = page * perPage;
    return list.slice(start, end);
}