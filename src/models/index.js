const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");

//Product --> CategoryId
Category.hasMany(Product)
Product.belongsTo(Category)

// car->userId
User.hasMany(Cart)
Cart.belongsTo(User)

// car-->productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purhcase --> userId
User.hasMany(Purchase)
Purchase.belongsTo(User)

//Purchase --> productId
Purchase.hasMany(Product)
Product.belongsTo(Purchase)

//ProductImg --> productId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)




