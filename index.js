const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')

const token = '7224972259:AAFHRBFwUb7KgDQNF4yyqHU3nCBMylruaCM'

const bot = new TelegramBot(token, { polling: true })

const commands = [
  { command: 'photo', description: 'Send photo' },
  { command: 'audio', description: 'Send audio' },
  { command: 'video', description: 'Send video' },
  { command: 'document', description: 'Send document' },
  { command: 'location', description: 'Send location' },
  { command: 'contact', description: 'Send contact' },
]
bot.setMyCommands(commands)

bot.on('text', (msg) => {
  const chatId = msg.chat.id

  if (msg.text === '/photo') {
    bot.sendPhoto(chatId, './assets/cat.jpeg', {
      caption: 'Cat'
    })
  } else if (msg.text === '/audio') {
    bot.sendMessage(chatId, 'Start audio uploading...')

    fs.readFile('./assets/audio.mp3', (_, data) => {
      bot.sendAudio(chatId, data)
    })
  } else if (msg.text === '/video') {
    bot.sendMessage(chatId, 'Start video uploading...')
    bot.sendVideo(chatId, 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4')

    // fs.readFile('./assets/video.mp4', (_, data) => {
    //   bot.sendVideo(chatId, data)
    // })  
  } else if (msg.text === '/document') {
    bot.sendMessage(chatId, 'Start document uploading...')

    fs.readFile('./assets/document.zip', (_, data) => {
      bot.sendDocument(chatId, data)
    })
  } else if (msg.text === '/location') {
    bot.sendLocation(chatId, 40.19658216433253, 44.47979688139048)
  } else if (msg.text === '/contact') {
    bot.sendContact(chatId, '+37412345678', 'Tumo')
  }
})
