# Products list helper Bot

[README in russian](README_RUS.md)

## About this project

This is a Telegram bot designed to make a shopping list.

The concept of working with the bot is as follows:
- you run out of something (milk, for example);
- you tell the bot "milk";
- In this way, over a period of time, your list will be accumulated in the bot's database;
- when you are about to go to the shop, you press " My shopping list " and the bot sends you the whole list in one message;
- when you return from the shop, you can click "Delete old shopping list" and your product records will be deleted from the database.


## Available Scripts

In the project directory, you can run:

- ### `npm start`

  Runs the app in the development mode.

- ### `npm run dbr`

  Recreate all database:
  delete the old database, create new database, run all migrations & run all seeds.

## Technologies used

- the project is written in JavaScript using the [telegraf](https://www.npmjs.com/package/telegraf) library;
- [dotenv](https://www.npmjs.com/package/dotenv) is used to store and use secret data;
- database uses PostgreSQL dialect;
- [Sequelize](https://www.npmjs.com/package/sequelize) is used to communicate with the database;
