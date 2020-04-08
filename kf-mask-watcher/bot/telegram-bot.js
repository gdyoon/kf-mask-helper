"use strict";

const TelegramBot = require("node-telegram-bot-api");
const config = require("config");
const { DynamodbClient } = require("../db");

class Telegram {
  constructor() {
    this._token = config.bot.telegram.token;
    this._bot = new TelegramBot(this._token);
    this._chatId = config.bot.telegram.chatId;
    this._db = new DynamodbClient();
  }

  async say(message) {    
    await this._bot.sendMessage(this._chatId, message);
  }

}

module.exports = Telegram;