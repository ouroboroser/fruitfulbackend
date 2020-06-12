const Router = require('koa-router');
const router = new Router();
const models = require('../models');

const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');
const jwt_decode = require ('jwt-decode');

router.get('/todocomment/:id', passport.authenticate('jwt', {session: false}), async(ctx, next) => {
    const toDoItemId = ctx.params.id
    return await models.ToDo.findOne ({
        where: {
            id: toDoItemId
        }
    }) 
    .then((toDo => {
        ctx.toDo = toDo;
        console.log(toDo);
        ctx.body = toDo;
    }
    ))
})

router.post('/addcomment/:id', passport.authenticate('jwt', {session: false}), async(ctx, next) => {
    const toDoItemId = ctx.params.id;
    console.log(toDoItemId);
    const accessToken = getToken(ctx.headers);
    console.log('accessToken: ' + getToken(ctx.headers));
    let decoded = jwt_decode(accessToken);
    console.log(decoded);
    const userId = decoded.id
    if(accessToken){
        const {comment}  = ctx.request.body
        const sendBy = userId;
        const addComment = await models.ToDoComment.create({
            comment,
            UserId:sendBy,
            ToDoId:toDoItemId
        })
        ctx.body = addComment;
    }
} )

router.get('/allcomments/:id', passport.authenticate('jwt', {session: false}), async(ctx,next) => {
    const toDoItemId = ctx.params.id;
    console.log(toDoItemId);
    const allComments = await models.ToDoComment.findAll({
        where:{
            ToDoId: toDoItemId
        }
    })
    ctx.body = allComments;
})

getToken = function (headers) {
    if (headers && headers.authorization) {
      let parted = headers.authorization.split(' ');
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