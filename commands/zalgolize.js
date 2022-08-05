const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
var zal = require("../utils/zalgolize");
module.exports = {
    name: 'zalgolize',
    description: 'Zalgolizes string.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if (args.length < 1) return message.channel.send("You must specify text to zalgolize!")
			 let botembed = new Discord.RichEmbed()
				.setTimestamp()
				.setFooter("Requested by "+message.author.tag)
				.setTitle("Zalgolized Text")
		        .setDescription(zal(args.join(" ")))
				.setColor(mod.getRandomColor())
				return message.channel.send(botembed);			
    },
};