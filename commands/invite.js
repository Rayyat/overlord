const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'invite',
    description: 'invite',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        let botembed = new Discord.RichEmbed()
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .setColor(mod.getRandomColor())
		  .setTimestamp()
		  .setFooter("Requested by "+message.author.tag)
		  .setTitle("Invite Links")
		  .setDescription("Overlord Invite link | "+`[Invite Overlord](http://discordapp.com/oauth2/authorize?client_id=466216552652603393&scope=bot&permissions=470285495)`+"\n"+"Support Server link | "+`[Join Support Server](https://discordapp.com/invite/5wZ2Ah2)`)
		  return message.channel.send(botembed)
    },
};