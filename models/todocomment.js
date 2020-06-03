'use strict';
module.exports = (sequelize, DataTypes) => {
  const ToDoComment = sequelize.define('ToDoComment', {
    comment: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    ToDoId: DataTypes.INTEGER
  }, {});
  ToDoComment.associate = function(models) {
    // associations can be defined here
  };
  return ToDoComment;
};