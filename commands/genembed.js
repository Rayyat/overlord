const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'genembed',
    description: 'Embed generator.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        let parsed = args.join(" ").split("$");
	  if(!args[0]||!parsed[0]||!parsed[1]||!parsed[2]||!parsed[3]){
		  let lembed = new Discord.MessageEmbed()
	      .addField("Command Information", "`[p]genembed <color hex>$<title>$<text>$<footer text>`")
		  .addField("Function", "Generates an embed.")
		  .setColor(mod.getRandomColor())
		  .setTimestamp()
		  return message.channel.send(lembed);
	  }
	let botembed = new Discord.MessageEmbed()
	.setAuthor(message.author.username, message.author.avatarURL)
	.setColor(parsed[0])
	.addField(parsed[1],parsed[2])
	.setFooter(parsed[3])
	.setTimestamp()
	return message.channel.send(botembed);
    },
};