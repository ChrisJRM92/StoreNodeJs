const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const ProductImg = sequelize.define('productImg', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
}
);

module.exports = ProductImg;