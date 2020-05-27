const Router = require('koa-router');
const router = new Router();
const jwtSecret = require('../config/jwt_config');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
//const tokenGenerator = require('uuid-token-generator');
const bcrypt = require('bcryptjs');

const models = require ('../models');

router.post('/signup', async (ctx, next) => {
    try {
        const { nick, name, email, password} = ctx.request.body
        let hashedPassword = bcrypt.hashSync(password, 10);
        let userData = await models.User.create({ nick, name, email, password:hashedPassword})         
        ctx.body = userData;
        await next();
    }
    catch (error) {
        console.error('error: ', error);
        ctx.status = 400;
        ctx.body = {status:'User authorization error 2'};
    }
})

router.post('/login', async (ctx, next) => {
    return passport.authenticate('local', async (err, user, info, status) => {
        if (err){
            return ctx.status = 400;
        } else {
            if (user) {
                ctx.login(user);
                const payload = {
                    id:user.id,
                    nick:user.nick
                };
                const accessToken = jwt.sign (payload, jwtSecret.secret, {expiresIn: jwtSecret.tokenLife});
                const refreshToken = jwt.sign(payload, jwtSecret.refreshTokenSecret, {expiresIn:jwtSecret.refreshTokenLife});
                ctx.body = {user:user.name, accessToken: `Bearer ${accessToken}`, refreshToken};
            } else {
                ctx.status = 400; 
                ctx.body = {status:'error'}
            }
        }    
    }) (ctx, next);
})

router.get('/logout', async (ctx, next) => {
    try {
        ctx.logout();
        ctx.redirect('/');
        console.log ('User has logout');
        ctx.body = {status:'User has logout'};
        await next();
    } catch (error) {
        console.error('error: ', error);
        ctx.status = 400;
    }
})
               
module.exports = router;