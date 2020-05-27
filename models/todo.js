'use strict';
module.exports = (sequelize, DataTypes) => {
  const ToDo = sequelize.define('ToDo', {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    description:DataTypes.STRING
  }, {});
  ToDo.associate = function(models) {
    // associations can be defined here
  };
  return ToDo;
};