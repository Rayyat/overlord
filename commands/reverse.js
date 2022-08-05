const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'reverse',
    description: 'Reverses the given text.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         if(!args[0]){
		  let botembed = new Discord.RichEmbed()
	      .addField("Command Information", "`[p]reverse <text>`")
		  .addField("Function", "Reverses the given text.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	     }
	  var sentth = args.slice(0).join(' ').split('').reverse().join('');
	  return message.channel.send(sentth);
    },
};