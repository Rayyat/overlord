const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'stats',
    description: "Shows bot's statistics.",
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
		var usage = process.memoryUsage().rss / 1048576
        let botembed = new Discord.MessageEmbed()
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .addField("Bot Statistics", "Statistics of the bot!!")
          .setColor(mod.getRandomColor())
		  .addField("Servers", `${client.guilds.size}`,true)
		  .addField("Channels", `${client.channels.size}`,true)
		  .addField("Users", `${client.users.size}`,true)
		  .addField("RAM Usage",usage+" MBs",true)
		  .addField("Invite", `[Invite Overlord](http://discordapp.com/oauth2/authorize?client_id=466216552652603393&scope=bot&permissions=470285495)`)
		  return message.channel.send(botembed);
    },
};