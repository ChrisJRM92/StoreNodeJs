const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const bcrypt = require('bcrypt');

const User = sequelize.define('users', {
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
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
});

User.beforeCreate(async(users)=>{
  const password = users.password;
  const hasPass = await bcrypt.hash(password, 10);
  users.password = hasPass;
})

module.exports = User;