const Router = require('koa-router');
const router = new Router();
const models = require('../models');

const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt_config');
const jwt_decode = require ('jwt-decode');

router.get('/todocomment/:id', passport.authenticate('jwt', {session: false}), async(ctx, next) => {
    try{
        return await models.ToDo.findOne ({
            where: {
                id: ctx.params.id
            }
        }) 
        .then((toDo => {
            ctx.toDo = toDo;
            console.log(toDo);
            ctx.body = toDo;
        }
        ))

    }
    catch(error){
        console.log(eror);
    }
})

// router.post('/addcomment')

module.exports = router;