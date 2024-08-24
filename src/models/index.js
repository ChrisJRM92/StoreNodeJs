const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");

Category.hasMany(Product)
Product.belongsTo(Category)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(Product)
Product.belongsTo(Cart)

User.hasMany(Purchase)
Purchase.belongsTo(User)

Purchase.hasMany(Product)
Product.belongsTo(Purchase)

ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)




