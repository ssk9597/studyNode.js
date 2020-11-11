'use strict';

const db = require('../models/');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Users',
            [
                {
                    username: 'James',
                    number: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'John',
                    number: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'Smith',
                    number: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('person', null, {});
    },
};
