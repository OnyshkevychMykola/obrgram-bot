const token = '7104337688:AAHH18RjCYjwj1drs_mL5kHhdP1vEvNdf9M';
const TelegramApi = require('node-telegram-bot-api');
const {againOptions, gameOprions} = require('./options')


const bot = new TelegramApi(token, {polling: true});

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Guess the number from 1 to 10');
  const randomNumber = Math.floor(Math.random() * 10 );
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Guess it', gameOptions)
}

bot.setMyCommands([
  { command: '/start',  description: 'Hello command'},
  { command: '/info',  description: 'User info'},
  { command: '/game',  description: 'Game'},
  { command: '/help',  description: 'Help Command'},
])

const start = () => {
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    if (text === '/start') {
      return  bot.sendMessage(chatId, `Hello, I'm the Obrgram Bot`);
    }
    if (text === '/info') {
      return  bot.sendMessage(chatId, `userID is ${userId}`)
    }
    if (text === '/game') {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'Sorry I dont Understand')
  });

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
      return startGame(chatId);
    }
    console.log(typeof data)
    if (parseInt( data, 10) === chats[chatId]) {
      return bot.sendMessage(chatId, `I chose  correct number: ${data}`, againOptions)
    } else {
      return bot.sendMessage(chatId, `I chose incorrect number: ${data}. 
      Correct was ${chats[chatId]}`,againOptions)

    }
  })
}

start();

