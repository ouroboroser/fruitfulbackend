const Router = require('koa-router');
const router = new Router();
const models = require('../models');

const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');
const jwt_decode = require ('jwt-decode');

router.post('/addtodo', passport.authenticate ('jwt', {session:false}), async (ctx, next) => {
  const accessToken = getToken(ctx.headers);
  console.log('accessToken: ' + getToken(ctx.headers));
  let decoded = jwt_decode(accessToken);
  console.log(decoded);
  const userId = decoded.id
  if ( accessToken) {
    console.log( 'Token has access');
    const {text , description}  = ctx.request.body
    const sendBy = userId;
    console.log('This your desription '+description);
    const toDoValue = await models.ToDo.create({ text, UserId:sendBy, description});         
    ctx.body = toDoValue;
  }   
})

router.get('/showalltodos', passport.authenticate ('jwt', {session:false}), async (ctx, next) => {
  const accessToken = getToken(ctx.headers);
  console.log('accessToken: ' + getToken(ctx.headers));
  const decoded = jwt_decode(accessToken);
  console.log(decoded);
  const userId = decoded.id
  console.log('UserId = ' + userId);
  ctx.body = 'All todos';
  if(userId){
    const getAllItems = await models.ToDo.findAll({
      where:{UserId:userId, complete:false}
    })
    ctx.body = getAllItems;
  }
  if(!userId){
    console.log('find all items error');
  }  
})

router.get('/showallcomplete', passport.authenticate('jwt', {session:false}), async(ctx,next) => {
  ctx.body = 'show all complete';
  const accessToken = getToken(ctx.headers);
  console.log('accessToken: ' + getToken(ctx.headers));
  const decoded = jwt_decode(accessToken);
  console.log(decoded);
  const userId = decoded.id
  console.log('UserId = ' + userId);
  ctx.body = 'All todos';
  ctx.body = userId;
  
  if (userId){
    const getAllCompleteItems = await models.ToDo.findAll({
      where: {
        UserId:userId,
        complete:true
      }
    })
    ctx.body = getAllCompleteItems;
  }
  
  if(!userId){
    console.log('find all complete error')
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