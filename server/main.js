/**
 * @createdDate:    17 Feb 2017
 * @description     main.js file which creates a server and listens to
 *                  the port specified.
 */

import express from 'express';
import configManager from './lib/utils/configManager';
// import { router } from './lib/routes';
import log from './lib/utils/logger';

const app = express();
const appConfig = configManager.getConfig('app');
let port = appConfig.port;
let host = appConfig.host;

// app.use(router);

const server = app.listen(port, host, () => {
  host = server.address().address;
  port = server.address().port;
  log.info(`Server listening at Host:  ${host},  Port: ${port},` +
           ` Mode: ${configManager.env} mode`);
});
