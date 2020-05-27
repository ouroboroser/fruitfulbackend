const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const models = require('../models');

router.get('/delete/:id', passport.authenticate ('jwt', {session:false}), async (ctx, next) => {
    try{
        return await models.ToDo.destroy ({
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
    catch (error){
        console.log(error);
    }
})

router.get('/update/:id', passport.authenticate('jwt', {session: false}), async (ctx, next) => {
    try{
        return await models.ToDo.update(
            {complete:true},
            {where: {
                id:ctx.params.id
            }}
        )
        .then((toDo => {
            ctx.toDo = toDo;
            console.log(toDo);
            ctx.body = toDo;
        }))
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router;