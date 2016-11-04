import * as jsonfile from 'jsonfile';
const settingsPath = './server/data/user_settings/default.json';

export default {
    getValue,
    setValue
};

//TODO use async functions
function getValue(key: string) {
    try {
        let settings = jsonfile.readFileSync(settingsPath);

        return settings[key];
    } catch (err) {
        return null;
    }
}

function setValue(key: string, value: any) {
    let settings = jsonfile.readFileSync(settingsPath);

    settings[key] = value;

    jsonfile.writeFileSync(settingsPath, settings, {spaces: 2});
}






