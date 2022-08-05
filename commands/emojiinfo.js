const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'emojiinfo',
    description: 'Shows information about the given emoji',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
    if (args.length < 1) {
        return message.channel.send("Please provide an emoji to gather info on!");
    }
    if (args[0].charCodeAt(0) >= 55296) {
       return message.channel.send("This is a built-in Discord emoji.");
    }
    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);
    if (!match || !match[1]) {
        return message.channel.send('Please provide a valid emoji!');
    }
    const emoji = client.emojis.get(match[1]);
    if (!emoji) {
        return message.channel.send('That emoji could not be identified.');
    }
	let botembed = new Discord.MessageEmbed()
	.setAuthor(client.user.username, client.user.avatarURL)
	.setColor(mod.getRandomColor())
	.addField("Emoji Information","Gives info about the specified emoji.")
	.addField("Name",emoji.name,true)
	.addField("From Server",emoji.guild.name,true)
	.addField("ID",emoji.id,true)
	.addField("Download URL",emoji.url,true)
	.setThumbnail(emoji.url)
	.setTimestamp()
	return message.channel.send(botembed);
    },
};