const passport = require('koa-passport');
const JWTstrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('../config/jwt_config');

const models = require('../models');

const opt = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:jwtSecret.secret    
};

module.exports = passport => {
    passport.use ( 'jwt', new JWTstrategy (opt, (payload, done) => {
        console.log('Jwt strategy')
        models.User.findOne({
            where:{
                id:payload.id
            }
        }). then (user => {
            if (user){
                console.log('Verify token');
                done(null, user);
            } else {
                console.log('Not verify token');
                done(null, false);
            }
        })
    }) )
   
    passport.serializeUser((user,cb) => {
        cb(null,user);
    })
    
    passport.deserializeUser((obj,cb) => {
        cb(null,obj);
    })

    
}
