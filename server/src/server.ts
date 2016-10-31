import * as express from 'express';
//import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as _ from 'lodash';

import config from './config';
import routes from './routes/routes';
import logger from './logger';

const app = express();

export default {
    start
};

function start(options) {
    initExpress();

    routes.init(app);

    //should be after routes.init
    initErrorHandling(app);

    app.listen(config.port, function () {
        console.log(`Server is listening on port ${config.port}!`);
    });
}

function initExpress() {
    //if (config.isDevLocal) app.use(morgan('dev')); //log requests

    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({extended: true}));

    //TODO add
    //app.use('/static', express.static(pathHelper.getRelative('../client/build/static')));

    app.use(cors());
}

function initErrorHandling(app) {
    //log unhandled errors
    app.use(function (err, req, res, next) {
        logger.error(err);

        console.log(err);

        let message = _.isError(err) ? err.message : err;
        message = config.isDevLocal ? message : 'Server Error';

        res.status(500).send({error: message});
    });

    process.on('uncaughtException', function (err) {
        logger.error(err);
    });
}