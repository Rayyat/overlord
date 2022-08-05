const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'mods',
	cooldown: 0.1,
    description: 'Allows you to manage moderators.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!isAdmin){
		  return;
	  }
	  TheClient.bigDB.loadOrCreate("Guilds", message.member.guild.id, async function(db) {
	  if(!args[0]){
		  let botembed = new Discord.MessageEmbed()
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .setColor(mod.getRandomColor())
		  .setTimestamp()
		  .addField("Server Moderator List", "Server bot moderators list for **"+message.member.guild.name+"**. You can add mods by `"+client.prefix+"mods [add/del] [userid/mention]`.")
		  var lsi = "";
		   if(db.serverMods.length != 0)
		   {
	     for (let i = 0; i < db.serverMods.length; i++) {
			 var mm = await client.fetchUser(db.serverMods[i]);
		 if(i == 0){
			 lsi = "`"+mm.tag+"`";
		 }
		 else{
			 lsi = lsi +" ,`"+mm.tag+"`";
		 }
		 
	  }
		   }
		   else{
			   lsi = "No mods in this server.";
		   }
		   botembed.addField("Mods",lsi)
		   return message.channel.send(botembed);
	  }	  
      if(args[0]=="add"){
	     let member = message.mentions.members.first() || message.guild.members.get(args[1]);
	   if(!member)
	   {return client.emit("cmderr",message,"Please mention a valid member of this server")}
       if(member.bot)
	       return;
       if(db.serverAdmins.includes(member.user.id)){
		   return client.emit("cmderr",message," This member is already an administrator of this server.");
	   }
       if(db.serverMods.includes(member.user.id)){
		   return client.emit("cmderr",message," This member is already an moderator of this server.");
	   }
	   else{
		   db.serverMods.push(member.user.id);
		   db.save();
		   if(db.adminmodlog == true)
		   {
		   const logChannel = message.member.guild.channels.find(val => val.name === db.logchannel);
	       let logembed = new Discord.MessageEmbed()
	       .setAuthor(client.user.username, client.user.avatarURL)
	       .setThumbnail(member.displayAvatarURL)	  
	       .setColor("#FF0000")
		   .setTimestamp()
	       .addField("Log - Moderator permit", `User : ${member.user.tag} ID: ${member.id}`)
	       .addField("Permitted by",message.member.user.tag)
	       .addField("Details",member.user.tag +" is now a moderator. Permitted by "+message.member.user.tag+".")
	       .setFooter("User ID: "+member.user.id)
	       logChannel.send(logembed);
		   }
		   let botembed = new Discord.MessageEmbed()
		   .setAuthor(client.user.username, client.user.avatarURL)
		   .setColor(mod.getRandomColor())
		   .setTimestamp()
		   .addField("Server Moderators",member.user.tag+" is now a moderator.")
		   return message.channel.send(botembed);
	   }
      }
	  if(args[0]=="del"){
	     let member = message.mentions.members.first() || message.guild.members.get(args[1]);
	   if(!member)
	   {return client.emit("cmderr",message,"Please mention a valid member of this server")}
       if(member.bot)
	       return;
       if(!db.serverMods.includes(member.user.id)){
		   return client.emit("cmderr",message," This member is not a moderator of this server.");
	   }
	   else{
		   var index = db.serverMods.indexOf(member.user.id);
          if (index > -1) {
            db.serverMods.splice(index, 1);
		    db.save();
          }		  
		   if(db.adminmodlog == true)
		   {
		   const logChannel = message.member.guild.channels.find(val => val.name === db.logchannel);
	       let logembed = new Discord.MessageEmbed()
	       .setAuthor(client.user.username, client.user.avatarURL)
	       .setThumbnail(member.displayAvatarURL)	  
	       .setColor("#FF0000")
		   .setTimestamp()
	       .addField("Log - Moderator delete", `User : ${member.user.tag} ID: ${member.id}`)
	       .addField("Removed by",message.member.user.tag)
	       .addField("Details",member.user.tag +" is not an moderator anymore. Removed by "+message.member.user.tag+".")
	       .setFooter("User ID: "+member.user.id)
	       logChannel.send(logembed);
		   }
		   let botembed = new Discord.MessageEmbed()
		   .setAuthor(client.user.username, client.user.avatarURL)
		   .setColor(mod.getRandomColor())
		   .setTimestamp()
		   .addField("Server Moderators",member.user.tag+" is not an moderator anymore.")
		   return message.channel.send(botembed);
	   }
      }
	  }, function(error) { console.log(error); });
    },
};