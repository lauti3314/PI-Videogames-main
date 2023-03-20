const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {timestamps: false
  });
};
