require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const { help, greeting, errorMessage } = require('./textForBot');
const { getMainMenu, yesNoKeyboard } = require('./keyboards');
const {
  addProduct,
  getProductList,
  deleteProductList,
} = require('./dbFunctions');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

bot.start((ctx) => ctx.reply(greeting, getMainMenu()));

bot.help((ctx) => ctx.reply(help));

bot.hears('Мой список покупок', async (ctx) => {
  const userId = ctx.message.from.id;
  const productList = await getProductList(userId);
  ctx.reply(productList);
});

bot.hears('Удалить старый список покупок', (ctx) => {
  if (ctx.session === undefined) {
    // eslint-disable-next-line camelcase
    const { update_id } = ctx.update;
    // eslint-disable-next-line camelcase
    ctx.session = { update_id };
  }
  ctx.session.userId = ctx.message.from.id;
  ctx.reply(
    'Вы действительно хотите удалить текущий список покупок?',
    yesNoKeyboard(),
  );
});

bot.action(['yes', 'no'], (ctx) => {
  if (ctx.callbackQuery.data === 'yes') {
    const { userId } = ctx.session;
    deleteProductList(userId);
    ctx.editMessageText('Ваш список покупок успешно удален');
  } else {
    ctx.editMessageText('Удаление отменено');
  }
});

bot.on('message', async (ctx) => {
  try {
    const product = ctx.message.text;
    const userId = ctx.message.from.id;
    addProduct(userId, product);
  } catch (error) {
    ctx.reply(errorMessage);
    console.log(error.message);
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
