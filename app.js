const Koa = require('koa');
const app = new Koa();
const PORT = process.env.PORT || 3001;
const cors = require('@koa/cors');
const models = require('./models');

app.use(cors());

const koaRouter = require('koa-router');
const koaBodyParser = require('koa-bodyparser');
const path = require('path');
const bcryptjs = require ('bcryptjs');
const passport = require ('koa-passport');
const jwtSecret = require('./config/jwt_config.js');
//const uuid = require('uuid');
const tokenGenerator = require('uuid-token-generator');
const jwt = require ('koa-jwt');

// if ('development' === app.get('env')) {
//     app.use(express.errorHandler());
//   }


// require('./middleware/jwtStrategy')(passport);

const router = require('./routes/index');
const authRouter = require('./routes/authentication');
const addNote = require('./routes/addNote');
const addToDo = require ('./routes/addToDo');
const updateToDo = require('./routes/updateToDo');
const getUser = require('./routes/getUser');
const getStatistics = require('./routes/getStatistics');
const findUser = require('./routes/findUser');
const friendsToDo = require('./routes/friendsToDo');
const addFriend = require('./routes/addFriend');
// const comment = require('./routes/comment');

app.use(koaBodyParser());
app.use(router.allowedMethods());

require('./middleware/auth');
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/jwtStrategy')(passport);
app.use(router.routes());
app.use(authRouter.routes());

// app.use(jwt({ secret:jwtSecret.secret}))
app.use(addNote.routes());
app.use(addToDo.routes());
app.use(updateToDo.routes());
app.use(getUser.routes());
app.use(getStatistics.routes());
app.use(findUser.routes());
app.use(friendsToDo.routes());
app.use(addFriend.routes());
// app.use(commnet.routes());


models.sequelize.sync({forse:true}).then(function () {
    app.listen(PORT, () => {
        console.log('Server has been stared');
    });
})
// app.listen(PORT, () => {
//     console.log('Server has been stared');
// });

module.exports = app;
