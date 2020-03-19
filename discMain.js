const Discord = require('discord.js');
const commando = require('discord.js-commando');
const fs = require('fs');
const PREFIX = '!';

const bot = new Discord.Client();

var yourBotToken = 'YOUR_BOT_TOKEN'
bot.login(yourBotToken);

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log('I am ready!');
  });

  bot.on('message', message=>{

      let args = message.content.substring(PREFIX.length).split(" ")

      switch(args[0]){ 
        case 'ping':
            bot.commands.get('ping').execute(message, args);
        break;

        case 'tx':
            bot.commands.get('tx').execute(message,args);
        break;

        case 'trollbox':
            bot.commands.get('trollbox').execute(message, args);
        break;

        case 'trigger':
            bot.commands.get('trigger').execute(message, args);
        break;

        case 'whale':
            bot.commands.get('whale').execute(message, args);

/*
        case 'balance':
            if(args[1] == null){
                message.channel.send('!balance + ETH adress required');
            } else {
                bot.commands.get('ethBalance1').execute(message, args[1]);
            }
        break;
        */

      }

  })



