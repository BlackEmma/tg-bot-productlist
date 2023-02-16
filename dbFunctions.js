const { Product } = require('./db/models');

const addProduct = async (userId, product) => {
  try {
    await Product.create({ user_id: userId, title: product });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addProduct,
};
