const bcrypt = require('bcrypt');

// Creating our Movies model
module.exports = function (sequelize, DataTypes) {
    const Requests = sequelize.define('Requests', {
        name: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, { freezeTableName: true });

    Requests.associate = function (models) {
        Requests.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Requests;
};
