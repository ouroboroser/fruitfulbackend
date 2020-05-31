const Router = require('koa-router');
const router = new Router();
const models = require('../models');
const passport = require('koa-passport');
const jwt_decode = require('jwt-decode');


router.post('/addfriend/:friendId', passport.authenticate('jwt', {session:false}), async(ctx, next) => {
    try{
        const friendId = ctx.params.friendId;
        const accessToken = getToken(ctx.headers);
        const decoded = jwt_decode(accessToken);
        const userId = decoded.id
        ctx.body = userId;
        console.log('friend = ' + userId + ' ' + friendId);
        const relationship = await models.Friend.create({userId, friendId});
    }

    catch(error){
        console.log(error);
    }
})

router.get('/allfriends', passport.authenticate('jwt', {session:false}), async (ctx,next) => {
  try{
    const accessToken = getToken(ctx.headers);
    const decoded = jwt_decode(accessToken);
    const userId = decoded.id
    const relationship = await models.Friend.findAll({
      where: {
        userId:userId
      }
    })

    const allRelationship = relationship.filter(obj => {
      return obj.userId
    })

    const allRelationshipId = allRelationship.map( ships => ships.friendId)
    const allRelationshipIdUnique = allRelationshipId.filter(findUnique)
    const allRelationshipIdUniqueValues = Object.values(allRelationshipIdUnique)
    
    const finalResult = await Promise.all(allRelationshipIdUniqueValues.map( async(item) => {
      return await models.User.findOne({
        where:{
          id:item
        }
      })
    }))

    ctx.body = finalResult;

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


  const findUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  
  module.exports = router;