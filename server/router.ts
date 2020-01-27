import Router from 'koa-router';
import * as controller from './controller';

const router = new Router();

router.get('/api/home', controller.homeController.index);
router.get('/api/redis', controller.homeController.redis);
router.post('/api/test', controller.homeController.test);

export default router;