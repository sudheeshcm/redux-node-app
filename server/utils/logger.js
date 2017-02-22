/**
 * @description     Logger used to log info and errors.
 */

import configManager from 'node-config-manager';
import bunyan from 'bunyan';

const loggerCfg = configManager.method.Logger();
let streamPath;

if (loggerCfg.isInfoNeeded) {
  streamPath = loggerCfg.streams;
} else {
  streamPath = loggerCfg.singleStream;
}
const log = bunyan.createLogger({
  name: `ReduxNodeApp: ${configManager.env}`,
  streams: streamPath,
});

export default log;
