const Router = require('koa-router');
const router = new Router();
const models = require('../models');
const passport = require('koa-passport');

router.get('/usertodos/:userId', passport.authenticate ('jwt', {session:false}), async (ctx, next) => {
  const userToDos = await models.ToDo.findAll({
    where:{
      UserId:ctx.params.userId, complete:false
    }
  })
  ctx.body = userToDos;
  console.log(userToDos);
})

module.exports = router;