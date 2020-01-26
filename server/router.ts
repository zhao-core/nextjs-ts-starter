import Router from 'koa-router';
import * as controller from './controller';

const router = new Router();

router.get('/api/home', controller.homeController.index);
router.post('/api/test', controller.homeController.test);

export default router;