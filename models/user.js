const bcrypt = require('bcrypt');

// Creating our Movies model
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isConfirmed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, { freezeTableName: true });

    User.associate = function (models) {
        User.hasMany(models.Requests, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        const document = this;
        return new Promise((resolve, reject) => {
            // run bcrypt.compare method to compare incoming password (i.e. 12345) with user's hashed password (i.e. 3rueoiehw4hgoig43)
            bcrypt.compare(password, document.password, function compareCallback(err, same) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(same);
                }
            });
        });
    };

    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};
