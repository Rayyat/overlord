const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'uptime',
    description: "Bot's uptime.",
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
       let totalSeconds = (client.uptime / 1000);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
	  let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
	  let botembed = new Discord.MessageEmbed()
	  .setTimestamp()
	  .setColor(mod.getRandomColor())
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setFooter("Requested by "+ message.author.tag)
	  .addField("Uptime",uptime)
      return message.channel.send(botembed);
    },
};