const { Product } = require('./db/models');

const addProduct = async (userId, product) => {
  try {
    await Product.create({ user_id: userId, title: product });
  } catch (error) {
    console.log(error.message);
  }
};

const getProductList = async (userId) => {
  try {
    const productList = await Product.findAll({ raw: true, where: { user_id: userId } });
    if (productList.length === 0) {
      return 'Ваш список продуктов сейчас пуст 😯';
    }
    const productListText = productList.reduce((acc, curr) => `${acc}🛒 ${curr.title}\n`, '');
    return productListText;
  } catch (error) {
    console.log(error.message);
    return ('Не удалось загрузить список :(');
  }
};

module.exports = {
  addProduct,
  getProductList,
};
