const sequelize = require('../utils/connection');
const createCategory = require('./createData/categoryCreate');
const createUser = require('./createData/userCreate');
require('../models')

const resetDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB reset ✅");
    await createUser();
    await createCategory();
    process.exit();
  } catch (e) {
    console.log(e);
  };
};

resetDatabase();