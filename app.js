require('dotenv').config();
const { Telegraf } = require('telegraf');
const { help, greeting, errorMessage } = require('./textForBot');
const {
  addProduct,
} = require('./dbFunctions');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(greeting));

bot.help((ctx) => ctx.reply(help));

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
