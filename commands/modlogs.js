const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'modlogs',
	cooldown: 0.1,
    description: 'Allows you to edit moderation logs settings.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!isAdmin && !isMod){
		  return;
	  }
	  if(isMod){
		  if(!modcommand.includes(module.exports.name)){
				  return;
		      }
	  }
	  TheClient.bigDB.loadOrCreate("Guilds", message.guild.id, function(db) {
      if(!args[0])
	  {
      var modl = "Disabled";
	  if(db.modlogs == true){
		  modl = "Enabled";
	  }
	  if(!message.guild.channels.cache.find(val => val.name === db.modlogchannel)){
		client.emit("warning",message,"The current specified modlogs channel(#"+db.modlogchannel+") does not exist.\n Please create the channel or change the channel using `"+client.prefix+"modlogs setchannel <channel>`.\n Otherwise modlogs may not work correctly.")
	  }
	  let botembed = new Discord.MessageEmbed()
	 .setAuthor(client.user.username, client.user.avatarURL)
	 .addField("Moderation Logs", "Here you can enable/disable moderation logs for your server. Moderation logs will appear in your modlogs channel, which can be set with `"+client.prefix+"modlogs setchannel [channelname]`. You can enable modlogs with `"+client.prefix+"modlogs [enable/disable]`.")
	 .setColor(mod.getRandomColor())
	 .setTimestamp()
	 .addField("Is Enabled ?",modl,true)
	 .addField("Modlog Channel","#"+db.modlogchannel,true)
	 return message.channel.send(botembed);
	  }
	  if(args[0] == "enable")
	  {
		     db.modlogs = true;
			 db.save();
			 return client.emit("success",message,"Moderation logs are successfully enabled for "+message.guild.name)
	  }
	  if(args[0] == "disable")
	  {
		     db.modlogs = false;
			 db.save();
			 return client.emit("success",message,"Moderation logs are successfully disabled for "+message.guild.name)
	  }
	  if(args[0] == "setchannel")
	  {
		 const logChannel = message.mentions.channels.first();
		 if(!logChannel)
		 {
			 return client.emit("cmderr",message,"The specified channel name could not be found or I don't have access to it! \n Remember that you have to ***mention*** the channel.");
		 }
		 db.modlogchannel = logChannel.name
		 db.save();
		 return client.emit("success",message,"Successfully changed the modlogs channel to **#"+logChannel.name+"**")
	  }
      }, function(error) { console.log(error); });
    },
};