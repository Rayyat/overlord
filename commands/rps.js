const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'rps',
	cooldown: 5,
    description: 'Rock paper scissors game.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
		if(!args[0]) return message.channel.send("You must give Rock/Paper/Scissors!!")
        let outcomes = [
    'ROCK',
    'PAPER',
    'SCISSORS'
  ];
  let userOutcome = args.join(' ').toUpperCase();
  let botOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
  let result = 'I win! :yum:';
  if (userOutcome === botOutcome) {
    result = 'Oh damn! It\'s a draw, dude. :confused:';
  }
  else if (userOutcome === 'ROCK') {
    if (botOutcome === 'SCISSORS') {
      result = 'You win. :clap:';
    }
  }
  else if (userOutcome === 'PAPER') {
    if (botOutcome === 'ROCK') {
      result = 'You win. :clap:';
    }
  }
  else if (userOutcome === 'SCISSORS') {
    if (botOutcome === 'PAPER') {
      result = 'You win. :clap:';
    }
  }
  let botembed = new Discord.RichEmbed()
  .setTimestamp()
  .setColor(mod.getRandomColor())
  .setDescription(`You chose **${userOutcome}**, I chose **${botOutcome}**. *${result}*`)
  .setFooter("Requested by "+message.author.tag)
  return message.channel.send(botembed);
  

    },
};