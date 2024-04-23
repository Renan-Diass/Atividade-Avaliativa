const database = require('../config/database');

class Post {
    constructor() {
        this.model = database.db.define('post', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.db.Sequelize.STRING
            },
            conteudo: {
                type: database.db.Sequelize.STRING
            },
            autorId: {
                type: database.db.Sequelize.STRING,
                reference: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    }
}

module.exports = (new Post).model;