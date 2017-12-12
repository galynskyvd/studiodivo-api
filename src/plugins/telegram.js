const Telegram = require('node-telegram-bot-api');
const {telegram: {key}} = require('../config.json');

const bot = new Telegram(key, {polling: true});

module.exports = {
    sendMessage: (chatId, text) => bot.sendMessage(chatId, text)
};