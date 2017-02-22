/**
 * @createdDate:    17 Feb 2017
 * @description     main.js file which creates a server and listens to
 *                  the port specified.
 */
import express from 'express';
import ejs from 'ejs';
import path from 'path';   
import configManager from './server/utils/configManager';
import router from './server/routes';    
import log from './server/utils/logger';

const app = express();
const appConfig = configManager.getConfig('app');
const clientDir = path.join(__dirname, appConfig.indexDir);
let port = process.env.PORT || appConfig.port;
let host = appConfig.host;

app.use(router);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', clientDir);
app.use(express.static(path.join(clientDir, 'static')));

const server = app.listen(port, host, () => {
  host = server.address().address;
  port = server.address().port;
  log.info(`Server listening at Host:  ${host},  Port: ${port},` +
           ` Mode: ${configManager.env} mode`);
});
