import * as opn from 'opn';
import * as detect from 'detect-port';
import * as axios from 'axios';

process.on('uncaughtException', function (err) {
    let stack = err.stack;
    console.log(`Uncaught exception. ${err}`);
});

import server from './server';
import config from './config';

async function start() {
    let isAppRunning = false;

    let freePort = await detect(config.port);

    //port is busy
    if (freePort !== config.port) {
        isAppRunning = await checkAppIsRunning(config.port);

        if (!isAppRunning) {
            console.log(`Port ${config.port} is busy. Please, change port in config file.`);
            return;
        }
    }

    if (!isAppRunning) {
        await server.start(config.port);
    }

    console.log(`${config.appID} is running on port ${config.port}!`);

    opn('', {app: ['chrome', `--app=http://localhost:${config.port}`]});
}

async function checkAppIsRunning(port) {
    try {
        let response = await axios.get(`http://localhost:${port}/info`);
        let appInfo = response.data;

        if (appInfo && appInfo.data) {
            return appInfo.data.app === config.appID;
        }
    } catch (err) {
        return false;
    }
}

start();