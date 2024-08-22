const Category = require("../../models/Category");

async function createCategory() {
  const category = {
    name: "shoes"
  }
  
  await Category.create(category)
};

module.exports = createCategory;