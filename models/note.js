'use strict';

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    descripton: DataTypes.STRING
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.User); 
  };
  return Note;
};