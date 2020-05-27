const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const jwt_decode = require('jwt-decode');
const models = require('../models');

router.get('/getcurrentuser', passport.authenticate ('jwt', {session:false}), async(ctx,next) => {
    try{
        const accessToken = getToken(ctx.headers);
        console.log('accessToken: ' + getToken(ctx.headers));
        var decoded = jwt_decode(accessToken);
        console.log(decoded);
        const userId = decoded.id
        if(accessToken){
            const currentUser = await models.User.findOne({
                where:{
                    id:userId
                }
            })

            ctx.body = currentUser;
        }
        else{
            console.log('Error');
        }
    }
    catch(error){
        console.log(error);
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