require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const { help, greeting } = require('./textForBot');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(greeting));
bot.help((ctx) => ctx.reply(help));
bot.on('message', (ctx) => {
  console.log(ctx.message); // проверка, что мы получаем сообщение
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
