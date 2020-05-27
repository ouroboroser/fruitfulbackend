const Router = require ('koa-router');
const router = new Router ();

const passport = require('koa-passport');
const models = require('../models');

router.get('/addnote', /*passport.authenticate('jwt' , {session:false})*/ async (ctx, next) => {
    try {
        ctx.body = 'This page where you can add your note';
        await next();
    }

    catch(err) {
        console.log ('Error ' + err);
    }
})

module.exports = router;