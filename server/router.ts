import Router from 'koa-router';
import * as controller from './controller';

const router = new Router();

router.get('/api/home', controller.homeController.index);
router.get('/api/redis', controller.homeController.redis);
router.post('/api/test', controller.homeController.test);
router.get('/api/user', controller.homeController.queryUser);
router.get('/api/all-user', controller.homeController.queryAllUser);
router.get('/api/one-user', controller.homeController.queryOneUser);

export default router;