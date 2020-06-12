const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const models = require('../models')

router.get('/finduser/:findUser', passport.authenticate('jwt', {session:false}), async(ctx,next)=> {
    const findUserByNick = await models.User.findOne({
        where:{
            nick:ctx.params.findUser
        }
    })
    ctx.body = findUserByNick;
    console.log(findUserByNick);
})

router.get('/user/:userNick', passport.authenticate('jwt', {session:false}), async(ctx,next) => {
    const userProfile = await models.User.findOne({
        where:{
            nick:ctx.params.userNick
        }
    })
    ctx.body = userProfile;
    console.log(userProfile);
})

module.exports = router;