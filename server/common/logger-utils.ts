import path from 'path';
import log4js from 'koa-log4';
import fs from 'fs';

const appDir = path.resolve(__dirname, '..');
const logDir = path.join(appDir, 'logs');

try {
  fs.mkdirSync(logDir);
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e);
    process.exit(1);
  }
}

log4js.configure(path.join(appDir, 'config/log4js.json'));

export default log4js;
