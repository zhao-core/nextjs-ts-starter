import { Context } from 'koa';
import log4js from '../common/logger-utils';

export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.logger = log4js.getLogger();
    console.log();
    await next();
  };
};