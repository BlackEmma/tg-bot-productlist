const { Markup } = require('telegraf');

function getMainMenu() {
  return Markup.keyboard([
    ['Мой список покупок'],
    ['Удалить старый список покупок'],
  ]).resize();
}

module.exports = { getMainMenu };
