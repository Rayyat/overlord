const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'setup',
	cooldown: 0.1,
    description: 'Setup guide',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
		const generateEmbed = start => {
			switch(start) {
				case 2:
					let botembed2 = new Discord.MessageEmbed()
					.setAuthor(client.user.username, client.user.avatarURL)
					.setTimestamp()
					.setColor(mod.getRandomColor())
					.setFooter("default prefix is * | React for next page")
					.addField("Bot Setup Guide | Page 2","Next, we can manage server bot moderators. To view and edit moderators type `"+client.prefix+"mods`. You can add moderators using `"+client.prefix+"mods [add/del]` and customize their commands using `"+client.prefix+"modcmds`.")
					return botembed2
				  break;
			  
			// you can of course customise this embed however you want
		  }
		}
        if(!isAdmin)
		  return;
	  if(!args[0]){
	   let botembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
		.setTimestamp()
		.setColor(mod.getRandomColor())
		.setFooter("default prefix is * | type "+client.prefix+" setup 2 for next page")
		.addField("Bot Setup Guide","Using this guide it will be easier to set up the bot for your server. Type `"+client.prefix+"help` for all commands. Firstly, we can start with server admins/mods. To view server administrators type `"+client.prefix+"admins` Admins are like the ones having Admin permissions. They have access to all administrator commands.")
		message.channel.send(botembed).then(message => {
			
			message.react('➡️')
			const collector = message.createReactionCollector(
			  // only collect left and right arrow reactions from the message author
			  (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
			  // time out after a minute
			  {time: 60000}
			)
		  
			let currentIndex = 0
			collector.on('collect', reaction => {
			  // remove the existing reactions
			  message.reactions.removeAll().then(async () => {
				// increase/decrease index
				reaction.emoji.name === '⬅️' ? currentIndex -= 1 : currentIndex += 1
				// edit message with new embed
				message.edit(generateEmbed(currentIndex))
				// react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
				if (currentIndex !== 0) await message.react('⬅️')
				// react with right arrow if it isn't the end
				if (currentIndex +1 < 6) message.react('➡️')
			  })
			})
		  })
	  }
	  if(args[0] == "2"){
		let botembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
		.setTimestamp()
		.setColor(mod.getRandomColor())
		.setFooter("default prefix is * | type "+client.prefix+" setup 3 for next page")
		.addField("Bot Setup Guide | Page 2","Next, we can manage server bot moderators. To view and edit moderators type `"+client.prefix+"mods`. You can add moderators using `"+client.prefix+"mods [add/del]` and customize their commands using `"+client.prefix+"modcmds`.")
		return message.channel.send(botembed);
	  }
	  if(args[0] == "3"){
		let botembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
		.setTimestamp()
		.setColor(mod.getRandomColor())
		.setFooter("default prefix is * | type "+client.prefix+" setup 4 for next page")
		.addField("Bot Setup Guide | Page 3","Did you know that you can customize the bot's prefix? Use `"+client.prefix+"setprefix <new prefix>`! The default prefix is `*`")
		return message.channel.send(botembed);
	  }
	  if(args[0] == "4"){
		let botembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
		.setTimestamp()
		.setColor(mod.getRandomColor())
		.setFooter("default prefix is * | type "+client.prefix+" setup 5 for next page")
		.addField("Bot Setup Guide | Page 4","Next, if you want you can enable logging features for your server. To do that type `"+client.prefix+"logs`. You can enable different types of logging there. But first, use `"+client.prefix+"logs setchannel <channel name>` to specify a channel for logging. Also you can use the modlogs function. The modlogs function logs moderation actions when commands like `"+client.prefix+"kick`,`"+client.prefix+"ban`,`"+client.prefix+"mute` are used. Type `"+client.prefix+"modlogs` to check it. You also need to set a modlogs channel for it, you can use `"+client.prefix+"modlogs setchannel <channel name>`.")
		return message.channel.send(botembed);
	  }
	  if(args[0] == "5"){
		let botembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
		.setTimestamp()
		.setColor(mod.getRandomColor())
		.setFooter("default prefix is * | type "+client.prefix+" setup 6 for next page")
		.addField("Bot Setup Guide | Page 5","You can use `"+client.prefix+"ignore` command on the channel you want that bot commands to be ignored by non-staff people. You can remove it with using `"+client.prefix+"dontignore` in the channel.")
		return message.channel.send(botembed);
	  }
	  if(args[0] == "6"){
		let botembed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
		.setTimestamp()
		.setColor(mod.getRandomColor())
		.setFooter("default prefix is * ")
		.addField("Bot Setup Guide | Page 6","If you are unsure about a format of a command , just do it like `"+client.prefix+"command`, and the bot will show you the formatting. You're good to go!! Thanks for using this guide!!")
		return message.channel.send(botembed);
	  }
    },
};