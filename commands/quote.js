const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'quote',
    description: 'Gives a random quote',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        const quotes = require('../utils/quotes.json');
		var i = mod.getRndInteger(1,Object.keys(quotes).length);//0 1 2 3
		let botembed = new Discord.MessageEmbed()
		.setAuthor(client.user.username, client.user.avatarURL)
		.setColor(mod.getRandomColor())
		.setTimestamp()
		.addField("Quote",quotes[i].quote+"\n "+"- **"+quotes[i].author+"**")
		.setFooter("Requested by "+message.author.tag)
		return message.channel.send(botembed);
    },
};