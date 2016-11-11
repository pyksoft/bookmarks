import * as opn from 'opn';
import * as detect from 'detect-port';

process.on('uncaughtException', function (err) {
    let stack = err.stack;
    console.log(`Uncaught exception. ${err}`);
});

import server from './server';
import config from './config';

async function start() {
    let port = await detect(config.port);

    if (port !== config.port) {
        console.log(`Port ${config.port} is busy. Please, change port in config file.`);
        return;
    }

    let serverPort = await server.start(config.port);

    console.log(`${config.appID} is running on port ${serverPort}!`);

    opn('', {app: ['chrome', `--app=http://localhost:${serverPort}`]});
}

start();