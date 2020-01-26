import { Context } from 'koa';
import { homeService } from '../service';

class HomeController {
  public static async index(ctx: Context) {
    ctx.logger.info('hi koa-next');
    ctx.status = 200;
    ctx.body = await homeService.sayHi('koa-next');
  }

  public static async test(ctx: Context) {
    ctx.status = 200;
    ctx.body = {
      success: true,
      result: {
        num: 5
      }
    };
  }
}

export default HomeController;