const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = async (message,errorMessage) => {
             let errembed = new Discord.MessageEmbed()
			 .setTimestamp()
			 .setColor("#ff0000")
			 .setFooter("Requested by "+message.author.tag)
			 .setAuthor("Error",mod.errorlink)
			 .setDescription(errorMessage);
			 return message.channel.send(errembed);
};