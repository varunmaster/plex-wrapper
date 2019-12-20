const bcrypt = require('bcrypt');

// Creating our Movies model
module.exports = function(sequelize, DataTypes) {
  const Movies = sequelize.define('Movies', {
    name: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.STRING
    },
    imdbID: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, { freezeTableName: true });

  return Movies;
};
