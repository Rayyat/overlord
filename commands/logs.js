const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'logs',
	cooldown: 0.1,
    description: 'Allows you to edit logging settings.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         if(!isAdmin){
		  return;
	  }
	  if(args[0]&&!args[1])
	  {
		  if(args[0] =="enable")
		  {
			  return client.emit("cmderr",message,"You must specify a type to enable!! Types are `ban/join/role/channel/permit/msgdel` Example: `[p]logs enable ban`");
		  }
		  if(args[0] =="disable")
		  {
			  return client.emit("cmderr",message,"You must specify a type to disable!! Types are `ban/join/role/channel/permit/msgdel` Example: `[p]logs disable ban`");
		  }
		  if(args[0] =="setchannel")
		  {
			  return client.emit("cmderr",message,"You must specify a channel for logging!!");
		  }
	  }
	  TheClient.bigDB.loadOrCreate("Guilds", message.guild.id, function(db) {
	  if(!args[0]&&!args[1])
	  {
	//let bicon = client.user.displayAvatarURL;
	var bub = "Disabled";
	var rl = "Disabled";
	var jl = "Disabled";
	var cnl = "Disabled";
	var aml = "Disabled";
	var msgd = "Disabled";
	if(db.rolelog == true){
		rl = "Enabled";
	}
	if(db.banunbanlog == true){
		bub = "Enabled";
	}
	if(db.joinleavelog == true){
		jl = "Enabled";
	}
	if(db.channellog == true){
		cnl = "Enabled";
	}
	if(db.adminmodlog == true){
		aml = "Enabled";
	}
	if(db.msgdellog == true){
		msgd = "Enabled";
	}
	if(!message.guild.channels.cache.find(val => val.name === db.logchannel)){
		client.emit("warning",message,"The current specified logging channel(#"+db.logchannel+") does not exist.\n Please create the channel or change the channel using `"+client.prefix+"`logs setchannel <channel>.\n Otherwise logging may not work correctly.")
	}
    let botembed = new Discord.MessageEmbed()
	.setAuthor(client.user.username, client.user.avatarURL)
    .addField("Logs", "Here you can enable or disable logging for certain events that happen in your server with `*logs [enable/disable] [ban/join/role/channel/permit/msgdel]`. Default logging channel is set as 'log'. You may change it if you want using `*logs setchannel yourchannelname`. You have to mention the channel.")
    .setColor(mod.getRandomColor())
  //  .setThumbnail(bicon)
    .addField("Ban&Unban", bub,true)
	.addField("Join&Leave", jl,true)
	.addField("Role Add&Remove", rl,true)
	.addField("Channel Create/Delete", cnl,true)
	.addField("Admin/Mod Permit", aml,true)
	.addField("Deleted Messages", msgd,true)
	.addField("Logging Channel", "#"+db.logchannel,true)
    .setTimestamp()
    return message.channel.send(botembed);
	 }
	 if(args[0] == "enable")
	 {
		 if(args[1].includes("ban"))
		 {
			 db.banunbanlog = true;
			 db.save();
			 return client.emit("success",message,"Successfully enabled logs for **Ban&Unban** in "+message.guild.name)
		 }
		 if(args[1].includes("role"))
		 {
			 db.rolelog = true;
			 db.save();
			 return client.emit("success",message,"Successfully enabled logs for **Role Add&Remove** in "+message.guild.name)
		 }
		 if(args[1].includes("join")||args[1].includes("leave"))
		 {
			 db.joinleavelog = true;
			 db.save();
			 return client.emit("success",message,"Successfully enabled logs for **Join&Leave** in "+message.guild.name)
		 }
		 if(args[1].includes("channel"))
		 {
			 db.channellog = true;
			 db.save();
			 return client.emit("success",message,"Successfully enabled logs for **Channel Create/Delete** in "+message.guild.name)
		 }
		 if(args[1].includes("admin")||args[1].includes("mod")||args[1].includes("permit"))
		 {
			 db.adminmodlog = true;
			 db.save();
			 return client.emit("success",message,"Successfully enabled logs for **Admin/Mod Permit** in "+message.guild.name)
		 }
		 if(args[1].includes("msgdel"))
		 {
			 db.msgdellog = true;
			 db.save();
			 return client.emit("success",message,"Successfully enabled logs for **Deleted Messages** in "+message.guild.name)
		 }
	 }
	 if(args[0] == "disable")
	 {
		 if(args[1].includes("ban"))
		 {
			 db.banunbanlog = false;
			 db.save();
			 return client.emit("success",message,"Successfully disabled logs for **Ban&Unban** in "+message.guild.name)
		 }
		 if(args[1].includes("role"))
		 {
			 db.rolelog = false;
			 db.save();
			 return client.emit("success",message,"Successfully disabled logs for **Role Add&Remove** in "+message.guild.name)
		 }
		 if(args[1].includes("join")||args[1].includes("leave"))
		 {
			 db.joinleavelog = false;
			 db.save();
			 return client.emit("success",message,"Successfully disabled logs for **Join&Leave** in "+message.guild.name)
		 }
		 if(args[1].includes("channel"))
		 {
			 db.channellog = false;
			 db.save();
			 return client.emit("success",message,"Successfully disabled logs for **Channel Create/Delete** in "+message.guild.name)
		 }
		 if(args[1].includes("admin")||args[1].includes("mod")||args[1].includes("permit"))
		 {
			 db.adminmodlog = false;
			 db.save();
			 return client.emit("success",message,"Successfully disabled logs for **Admin/Mod Permit** in "+message.guild.name)
		 }
		 if(args[1].includes("msgdel"))
		 {
			 db.msgdellog = false;
			 db.save();
			 return client.emit("success",message,"Successfully disabled logs for **Deleted Messages** in "+message.guild.name)
		 }
	 }
	 if(args[0] == "setchannel")
	 {
		 const logChannel = message.mentions.channels.first();
		 if(!logChannel)
		 {
			 return client.emit("cmderr",message,"The specified channel name could not be found or I don't have access to it! \n Remember that you have to ***mention*** the channel.");
		 }
		 db.logchannel = logChannel.name
		 db.save();
		 return client.emit("success",message,"Successfully changed the logging channel to **#"+logChannel.name+"**")
	 }
	}, function(error) { console.log(error); });
    },
};