import Koa from 'koa';
import next from 'next';
import router from './router';
import log4js from './common/logger-utils';
import logger from './middleware/logger';

const port = parseInt((process as any).env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = new Koa();
  const appLogger = log4js.getLogger('kao-app');

  dev && server.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });
  // 此处有问题
  // server.use(
  //   nextKoa(nextApp, {
  //     cache: dev ? null : ssrCache,
  //   })
  // );
  // server.use(logger());
  server.use(router.routes());

  server.listen(port, () => {
    appLogger.info(`> Ready on http://localhost:${port}`);
  });
});
