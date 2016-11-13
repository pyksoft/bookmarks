import * as _ from 'lodash';
import * as jsonfile from 'jsonfile';
import pathHelper from './helpers/pathHelper';

let config = {
    port: 4088,
    isDevLocal: false,
    appID: 'Bookmarks Archive'
};

function tryReadConfigFile(fileName) {
    try {
        let filePath = pathHelper.getDataRelative('config', fileName);
        return jsonfile.readFileSync(filePath);
    } catch (err) {
        return {};
    }
}

let defaultFile = tryReadConfigFile('settings.json');
_.merge(config, defaultFile);

let localFile = tryReadConfigFile('local.json');
_.merge(config, localFile);

export default config;