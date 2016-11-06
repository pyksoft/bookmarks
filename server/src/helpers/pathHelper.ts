import * as path from 'path';
import * as _ from 'lodash';

let rootPath = getRootPath();
let dataPath = getDataPath();
let clientPath = getClientPath();

export default {
    path: path,
    getRelative: getRelativePath,
    getDataRelative: getDataRelativePath,
    getClientRelative: getClientRelativePath
};

function getRelativePath(...paths: string[]) {
    let args = _.toArray(arguments);

    args.unshift(rootPath);

    return path.join.apply(this, args);
}

function getDataRelativePath(...paths: string[]) {
    let args = _.toArray(arguments);

    args.unshift(dataPath);

    return path.join.apply(this, args);
}

function getClientRelativePath(...paths: string[]) {
    let args = _.toArray(arguments);

    args.unshift(clientPath);

    return path.join.apply(this, args);
}


function getRootPath() {
    if (process.env['NODE_ENV'] === "production") {
        return path.join(__dirname, './');
    }

    return path.join(__dirname, '../../..');
}

function getClientPath() {
    if (process.env['NODE_ENV'] === "production") {
        return getRelativePath('./client');
    }

    return getRelativePath('../client/build');
}

function getDataPath() {
    if (process.env['NODE_DATA_DIR']) {
        return process.env['NODE_DATA_DIR'];
    }

    return path.join(rootPath, 'data');
}