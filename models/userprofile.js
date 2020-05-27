'use strict';
module.exports = (sequelize, DataTypes) => {
  const userProfile = sequelize.define('userProfile', {
    profileStatus: DataTypes.STRING,
    profileDescription: DataTypes.STRING
  }, {});
  userProfile.associate = function(models) {
    // associations can be defined here
  };
  return userProfile;
};