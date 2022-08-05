const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = async (message,errorMessage) => {
             let errembed = new Discord.MessageEmbed()
			 .setTimestamp()
			 .setColor("#ffcc4d")
			 .setFooter("Requested by "+message.author.tag)
			 .setAuthor("Warning",mod.warnlink)
			 .setDescription(errorMessage);
			 return message.channel.send(errembed);
};