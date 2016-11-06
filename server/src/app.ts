import * as opn from 'opn';

process.on('uncaughtException', function (err) {
    let stack = err.stack;
    console.log(`Uncaught exception. ${err}`);
});

import server from './server';
import config from './config';

server.start(config.port)
    .then((port) => {
        console.log(`Bookmarks Archive is running on port ${port}!`);

        opn('', {app: ['chrome', `--app=http://localhost:${port}`]});
    });