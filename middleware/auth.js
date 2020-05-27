const passport = require ('koa-passport');
const localStrategy = require ('passport-local').Strategy; 
const models = require ('../models'); 

const JWTstrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('../config/jwt_config');

const bcrypt = require('bcryptjs');


passport.use( new localStrategy({
    usernameField: 'nick',
    passwordField: 'password',
    session: false
},
    (nick, password, done) => {
        try {
            console.log ('Local strategy')
            models.User.findOne({
                where: { nick: nick }                
            }) .then ( (user) => {
                if(!user) {
                    console.log('User does not exist');
                    return done (null, false, {message : 'User does not exist'});
                } else {
                    bcrypt.compare(password, user.password).then (responce => {
                        if (responce !== true ) {
                            console.log('Error with password validation');
                            return done(null, false, {message:'Incorrect password'});
                        }
                        console.log ('User has logged')
                        return done(null, user);
                    })
                }
                // console.log ('User has logged')
                // return done(null, user);
            })
        }
        catch (err) {
            console.log('Error with local strategy registration ' + err);
            done(err);
        }
    }
));

passport.serializeUser((user,cb) => {
    cb(null,user);
})

passport.deserializeUser((obj,cb) => {
    cb(null,obj);
})

// const opt = {
//     jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey:jwtSecret.secret 
// };

// passport.use ( 'jwt', new JWTstrategy (opt, (payload, done) => {
//     models.User.findOne({
//         where:{
//             username:payload.id
//         },
//     }).then (user => {
//         if (user) {
//             console.log('User found');
//             done(null,user);
//         } else {
//             console.log('User not found');
//             done(null, false);
//         }
//     })
// })
// )