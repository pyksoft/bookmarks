import * as jsonfile from 'jsonfile';
import pathHelper from '../helpers/pathHelper';
import * as fs from 'fs';

export default {
    readDataSync,
    saveData
}

const dbPath = pathHelper.getDataRelative('db.json');

function readDataSync() {
    try {
        let stat = fs.statSync(dbPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            jsonfile.writeFileSync(dbPath, getDefaultData())
        } else {
            throw err;
        }
    }

    return jsonfile.readFileSync(dbPath);
}

function saveData(data) {
    return new Promise((resolve, reject) => {
        jsonfile.writeFile(dbPath, data, function (err) {
            if (err) return reject(err);

            return resolve(null);
        })
    });
}

function getDefaultData() {
    return {
        tags: [],
        bookmarks: []
    }
}