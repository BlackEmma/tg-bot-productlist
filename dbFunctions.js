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

const deleteProductList = async (userId) => {
  try {
    await Product.destroy({ where: { user_id: userId } });
    return ('success');
  } catch (error) {
    console.log(error.message);
    return ('Что-то пошло не так, попробуйте позже');
  }
};

module.exports = {
  addProduct,
  getProductList,
  deleteProductList,
};
