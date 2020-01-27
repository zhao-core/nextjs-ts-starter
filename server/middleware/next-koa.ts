import { Context } from 'koa';
import { parse } from 'url';

interface IArgs {
  cache?: any;
}

export async function nextRender(ctx: Context, app: any, args: IArgs) {
  const { req, res, path } = ctx;
  const parsedUrl = parse(`${req.url}`, true);
  const { pathname, query } = parsedUrl;
  const ssrCache = args.cache;
  const key = `${req.url}`;

  if (!app.prepared) {
    await app.prepare();
    app.prepared = true;
  }

  if (ctx.csrf) {
    req.headers.csrf = ctx.csrf;
  }

  if (ssrCache && !/\/_next\//.test(path)) {
    if (ssrCache.has(key)) {
      ctx.body = ssrCache.get(key);
      return;
    }
    await app.renderToHTML(req, res, pathname, query).then((html: string) => {
        console.log(key, html);
        ssrCache.set(key, html);
        ctx.body = html;
      }).catch((err: any) => {
        console.error(err);
        app.renderError(err, req, res, pathname, query);
      });
    return;
  }

  const requestHandler = app.getRequestHandler();
  await requestHandler(req, res, parsedUrl);
  ctx.respond = false;
}

export default (app: any, args = {}) => async (ctx: Context, next: () => Promise<any>) => {
  const path = ctx.path;

  if (/\/_next\//.test(path)) {
    await nextRender(ctx, app, args);
    return;
  } else {
    await next();
    if (ctx.status !== 404 || ctx.method !== 'GET') {
      return;
    }
    await nextRender(ctx, app, args);
  }
};
