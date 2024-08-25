const sequelize = require('./connection');
require('../models')

const resetDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB reset ✅");
    process.exit()
  } catch (e) {
    console.log(e)
  }
}
resetDatabase()