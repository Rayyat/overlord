const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'modcmds',
	cooldown: 0.1,
    description: 'Allows you to manage moderator commands.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         if(!isAdmin){
		  return;
	  }
	  TheClient.bigDB.loadOrCreate("Guilds", message.member.guild.id, function(db) {
		  if(!args[0]){
		  let botembed = new Discord.RichEmbed()
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .setColor(mod.getRandomColor())
		  .addField("Moderator Commands List", "Moderator commands list for "+message.member.guild.name+". You can add commands by `*modcmds [add/del] [cmd name]`")
		  .addField("Commands",mod.listmodcommand(modcommand,client.prefix))
		  .setTimestamp()
		  return message.channel.send(botembed);
		  }
		  if(args[0] == "add"){
			  if(db.modcmds.includes(args[1])){
				   return message.channel.send("This command is already available for moderators.");
			  }
			  if(args[1] == "admins" || args[1] == "modcmds" || args[1] == "mods"){
				   return;
			  }
			 db.modcmds.push(args[1]);
	         db.save();
			 let botembed = new Discord.RichEmbed()
			 .setAuthor(client.user.username, client.user.avatarURL)
		     .setColor(mod.getRandomColor())
			 .addField("Moderator Commands","Moderators in "+message.member.guild.name +" are able to use the command `"+client.prefix+ args[1]+"`.")
			 .setTimestamp()
			 return message.channel.send(botembed);
		  }
		  if(args[0] == "del"){
			  if(!db.modcmds.includes(args[1])){
				   return message.channel.send("This command is not available for moderators already.");
			  }
			  if(args[1] == "admins" || args[1] == "modcmds" || args[1] == "mods"){
				   return;
			  }
			 var index = db.modcmds.indexOf(args[1]);
          if (index > -1) {
            db.modcmds.splice(index, 1);
		    db.save();
          }
			 let botembed = new Discord.RichEmbed()
			 .setAuthor(client.user.username, client.user.avatarURL)
		     .setColor(mod.getRandomColor())
			 .setTimestamp()
			 .addField("Moderator Commands","Moderators in "+message.member.guild.name +" are not able to use the command `"+client.prefix+args[1]+"` anymore.")
			 return message.channel.send(botembed);
		  }
		  }, function(error) { console.log(error); });
    },
};