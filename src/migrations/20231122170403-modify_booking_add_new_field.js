'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'Bookings', //table
      'NumberOfSeats', //name of column
      {
        type: Sequelize.INTEGER, //type of data,
        allowNull:false,
        defaultValue:1
      }
    );
    //one column done now next column for cost 
    await queryInterface.addColumn(
      'Bookings', //table
      'totalCost', //name of column
      {
        type: Sequelize.INTEGER, //type of data,
        allowNull:false,
        defaultValue:0
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Bookings','NumberOfSeats');
    await queryInterface.removeColumn('Bookings','totalCost');




  }
};
