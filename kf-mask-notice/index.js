const { TelegramBot } = require("./bot");


exports.handler = async (event, context) => {
  try {
    const telegramBot = new TelegramBot();
    await telegramBot.notice();
  } catch(err) {
    console.log(err);
  }
}