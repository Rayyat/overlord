const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'admins',
	cooldown: 0.1,
    description: 'Allows you to manage administrators.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         if(!isAdmin){
		  return;
	  }
	  console.log("itd")
	  TheClient.bigDB.loadOrCreate("Guilds", message.member.guild.id, async function(db) {
	  if(!args[0]){
		  let botembed = new Discord.MessageEmbed()
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .setColor(mod.getRandomColor())
		  .setTimestamp()
		  .addField("Server Administrator List", "Server bot administrators list for **"+message.member.guild.name+"**. You can add admins by `*admins [add/del] [userid/mention]`")
		  var lsi = "None.";
		   if(db.serverAdmins.length != 0)
		   {
	     for (let i = 0; i < db.serverAdmins.length; i++) {
			 var mm = await client.fetchUser(db.serverAdmins[i]);
		 if(i == 0){
			 lsi = "`"+mm.tag+"`";
		 }
		 else{
			 lsi = lsi +" ,`"+mm.tag+"`";
		 }
		 
	  }
		   }
		   else{
			   lsi = "No admins in this server.";
		   }
		   botembed.addField("Admins",lsi)
		   return message.channel.send(botembed);
	  }	  
      if(args[0]=="add"){
	     let member = message.mentions.members.first() || message.guild.members.get(args[1]);
	   if(!member)
	   {return client.emit("cmderr",message,"Please mention a valid member of this server");}
       if(member.bot)
	       return;
       if(db.serverMods.includes(member.user.id)){
		   return client.emit("cmderr",message," This member is already a moderator of this server. If you want to add this member as an administrator, first please delete this member from moderators group with `*mods del [id/mention]`.");
	   }
       if(db.serverAdmins.includes(member.user.id)){
		   return client.emit("cmderr",message," This member is already an administrator of this server.");
	   }
	   else{
		   db.serverAdmins.push(member.user.id);
		   db.save();
		   if(db.adminmodlog == true)
		   {
		   const logChannel = message.member.guild.channels.find(val => val.name === db.logchannel);
	       let logembed = new Discord.MessageEmbed()
	       .setAuthor(client.user.username, client.user.avatarURL)
	       .setThumbnail(member.displayAvatarURL)	  
	       .setColor("#FF0000")
		   .setTimestamp()
	       .addField("Log - Administrator permit", `User : ${member.user.tag} ID: ${member.id}`)
	       .addField("Permitted by",message.member.user.tag)
	       .addField("Details",member.user.tag +" is now an administrator. Permitted by "+message.member.user.tag+".")
	       .setFooter("User ID: "+member.user.id)
	       logChannel.send(logembed);
		   }
		   let botembed = new Discord.MessageEmbed()
		   .setAuthor(client.user.username, client.user.avatarURL)
		   .setColor(mod.getRandomColor())
		   .setTimestamp()
		   .addField("Server Administrators",member.user.tag+" is now an administrator.")
		   return message.channel.send(botembed);
	   }
      }
	  if(args[0]=="del"){
	     let member = message.mentions.members.first() || message.guild.members.get(args[1]);
	   if(!member)
	   {return client.emit("cmderr",message,"Please mention a valid member of this server")}
       if(member.bot)
	       return;
	   if(member.user.id == message.member.id)
       {
		   return client.emit("cmderr",message," You cannot remove yourself.");
       }
       if(member.user.id == message.guild.ownerID)
       {
		   return client.emit("cmderr",message," The server owner cannot be removed.");
       }
       if(!db.serverAdmins.includes(member.user.id)){
		   return client.emit("cmderr",message," This member is not an administrator of this server.");
	   }
	   else{
		   var index = db.serverAdmins.indexOf(member.user.id);
          if (index > -1) {
            db.serverAdmins.splice(index, 1);
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
	       .addField("Log - Administrator delete", `User : ${member.user.tag} ID: ${member.id}`)
	       .addField("Removed by",message.member.user.tag)
	       .addField("Details",member.user.tag +" is not an administrator anymore. Removed by "+message.member.user.tag+".")
	       .setFooter("User ID: "+member.user.id)
	       logChannel.send(logembed);
		   }
		   let botembed = new Discord.MessageEmbed()
		   .setAuthor(client.user.username, client.user.avatarURL)
		   .setColor(mod.getRandomColor())
		   .setTimestamp()
		   .addField("Server Administrators",member.user.tag+" is not an administrator anymore.")
		   return message.channel.send(botembed);
	   }
      }
	  }, function(error) { console.log(error); });
    },
};