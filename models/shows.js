const bcrypt = require('bcrypt');

// Creating our Movies model
module.exports = function(sequelize, DataTypes) {
  const Shows = sequelize.define('Shows', {
    name: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.STRING
    },
    imdbID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    seasonNum: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    episodeNum: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, { freezeTableName: true });

  return Shows;
};
