const sequelize = require('../utils/connection');
const createUser = require('./createData/userCreate');
require('../models')

const resetDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB reset ✅");
    await createUser()
    process.exit()
  } catch (e) {
    console.log(e)
  }
}
resetDatabase()