/**
* @description     Configuration Manager
*/

import configManager from 'node-config-manager';

const options = {
  configDir: './config',
  env: process.env.NODE_ENV || 'development',
  camelCase: true,
};

(function confMgr() {
  configManager.init(options);
  configManager.addConfig('app');
  configManager.addConfig('logger');
}());

export default configManager;
