import toastr from 'toastr';

export default {
    get: httpGet,
    post: httpPost,
    patch: httpPatch,
    put: httpPut,
    delete: httpDelete
}

function httpGet(url, queryParams) {
    return fetch(`${url}${getQueryString(queryParams)}`)
        .then((response) => {
            checkStatus(response);

            return response.json();
        })
        .catch((err) => {
            handleError(err);
        });
}

function httpPost(url, data) {
    let request = new Request(url, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then((response) => {
            checkStatus(response);
        })
        .catch((err) => {
            handleError(err);
        });
}

function httpPut(url, data) {
    let request = new Request(url, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'PUT',
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then((response) => {
            checkStatus(response);
        })
        .catch((err) => {
            handleError(err);
        });
}

function httpPatch(url, data) {
    let request = new Request(url, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then((response) => {
            checkStatus(response);
        })
        .catch((err) => {
            handleError(err);
        });
}

function httpDelete(url) {
    return fetch(url, {method: 'DELETE'})
        .then((response) => {
            checkStatus(response);
        })
        .catch((err) => {
            handleError(err);
        });
}

function handleError(err) {
    toastr.error(err);
}

function checkStatus(response) {
    if (!response.ok) throw new Error(`Invalid HTTP response status ${response.status}`);
}

function getQueryString(params) {
    if (!params || !Object.keys(params).length) return '';

    const esc = encodeURIComponent;

    let query = '?';

    query += Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    return query;
}