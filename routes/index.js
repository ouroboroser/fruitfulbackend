const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Welcome, this is main page !!!';
})

module.exports = router;