const Product = require("../../models/Product");

async function createProduct() {
  const product = {
    title: "Nike XR",
    description: "Lorem ipsun nike shoes",
    price: 24.99
  };
  await Product.create(product);
};

module.exports = createProduct;