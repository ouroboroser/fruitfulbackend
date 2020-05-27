'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint( 'Users', ['nick', 'email'], {
        type: 'unique',
        name: 'checkUnique'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Users',
      'checkUnique'
    )
  }
};
