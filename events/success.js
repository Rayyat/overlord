const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = async (message,errorMessage) => {
             let errembed = new Discord.MessageEmbed()
			 .setTimestamp()
			 .setColor("#77b255")
			 .setFooter("Requested by "+message.author.tag)
			 .setAuthor("Success",mod.succlink)
			 .setDescription(errorMessage);
			 return message.channel.send(errembed);
};