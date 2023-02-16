require('dotenv').config();
const { Telegraf } = require('telegraf');
const { help, greeting, errorMessage } = require('./textForBot');
const { getMainMenu } = require('./keyboards');
const {
  addProduct,
  getProductList,
} = require('./dbFunctions');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(greeting, getMainMenu()));

bot.help((ctx) => ctx.reply(help));

bot.hears('Мой список покупок', async (ctx) => {
  const userId = ctx.message.from.id;
  const productList = await getProductList(userId);
  ctx.reply(productList);
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
