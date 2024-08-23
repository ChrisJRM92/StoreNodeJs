const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

Category.hasMany(Product)
Product.belongsTo(Category)

// Category.belongsToMany(Product, {through: 'productGender'});
// Product.belongsToMany(Category, {through: 'productGender'});
