const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const ProductImg = sequelize.define('productimg', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = ProductImg;