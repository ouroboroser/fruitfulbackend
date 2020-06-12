const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const jwt_decode = require('jwt-decode');
const models = require('../models');

router.get('/getstatiscs', passport.authenticate ('jwt', {session:false}), async(ctx,next) => {
  const accessToken = getToken(ctx.headers);
  console.log('accessToken: ' + getToken(ctx.headers));
  var decoded = jwt_decode(accessToken);
  console.log(decoded);
  const userId = decoded.id
  ctx.body = userId;
  if(userId){
    const getAllToDos = await models.ToDo.count({
      where:{UserId:userId}
    })
    console.log('All todos = ' + getAllToDos);
    const getAllToDosComplete = await models.ToDo.count({
      where:{UserId:userId, complete:true}
    })
    console.log('All ToDos Complete = ' + getAllToDosComplete)
    const getAllToDosUnComplete = await models.ToDo.count({
      where:{UserId:userId, complete:false}
    })
    console.log('All ToDos Complete = ' + getAllToDosUnComplete)
    
    const STATISTICS = {
      allItems:getAllToDos,
      unCompleteItems:getAllToDosUnComplete,
      completeItems: getAllToDosComplete
    }
    
    ctx.body = STATISTICS;
    console.log(STATISTICS);
    console.log(typeof STATISTICS);
  }
})

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

module.exports = router;