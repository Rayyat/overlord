const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = async (message,errorMessage) => {
             let errembed = new Discord.MessageEmbed()
			 .setTimestamp()
			 .setColor("#448ce8")
			 .setFooter("Requested by "+message.author.tag)
			 .setAuthor("Missing Permissions",mod.qulink)
			 .setDescription(errorMessage);
			 return message.channel.send(errembed);
};