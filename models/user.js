'use strict';
const bcrypt = require ('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nick:{
      type:DataTypes.STRING,
      validate:{
        len:[8,50]
      }
    },
    name: {
      type:DataTypes.STRING,
      validate:{
        len:[1,50]
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail: true,
      },
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:[10,128]
      }
    },
  }, {});
  
  User.beforeSave = ((user, option) => {
    if(user.changed ('password')) {
      console.log('Password has been hashed');
      return user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  })
  
  User.prototype.validPassword = async function(passw){
    console.log('Password has been checked')
    return await bcrypt.compare(passw, this.password)
  }

  User.associate = models => {
    User.hasMany(models.ToDo);
  }
  return User;
};
