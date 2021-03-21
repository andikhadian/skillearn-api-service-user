'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('users', [{
       name: 'andikha dian',
       email: 'andikha.dev@gmail.com',
       password: await bcrypt.hash('admin', 10),
       profession: 'Web Developer',
       role: 'admin',
       created_at: new Date(),
       updated_at: new Date(),
     }, {
        name: 'Linda Ramadhani',
        email: 'ramadhanilinda@gmail.com',
        password: await bcrypt.hash('linda', 10),
        profession: 'UI/UX Designer',
        role: 'student',
        created_at: new Date(),
        updated_at: new Date(),
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
