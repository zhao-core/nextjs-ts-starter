import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import log4js from './common/logger-Utils';

const port = parseInt((process as any).env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  const appLogger = log4js.getLogger('kao-app');
  server.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }));

  // server.use(koaBunyanLogger(bunyan.createLogger({
  // name: 'next-koa-ts', level: 'debug', serializers: bunyan.stdSerializers
  // })));
  // server.use(koaBunyanLogger.requestLogger());

  router.get('/home', async (ctx) => {
    const log = log4js.getLogger('home');
    log.info('index do some awesome things');
    await nextApp.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  router.get('/profile', async (ctx) => {
    await nextApp.render(ctx.req, ctx.res, '/profile', ctx.query);
    ctx.respond = false;
  });

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    appLogger.info(`> Ready on http://localhost:${port}`);
  });
});
