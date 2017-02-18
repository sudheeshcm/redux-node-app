/**
 * @createdDate:    17 Feb 2017
 * @description     main.js file which creates a server and listens to
 *                  the port specified.
 */
'use strict';
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import configManager from './lib/utils/configManager';
import router from './lib/routes';
import log from './lib/utils/logger';

const app = express();
const appConfig = configManager.getConfig('app');
const clientDir = path.join(__dirname, appConfig.indexDir);
let port = appConfig.port;
let host = appConfig.host;

app.use(router);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', clientDir);
app.use(express.static(path.join(clientDir, 'static')));

const server = app.listen(port, host, () => {
  host = server.address().address;
  port = server.address().port;
  log.info(`Server listening at Host:  ${host},  Port: ${port},` +
           ` Mode: ${configManager.env} mode`);
});
