const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = async (client,message, action, target, reason, TheClient) => {
      TheClient.bigDB.loadOrCreate("Guilds", message.guild.id, function(db) {
		if(db.modlogs == true)
		{
	   var number = db.modlogscase;
	   db.modlogscase = db.modlogscase+1;
	   db.save();
	   const logChannel = message.member.guild.channels.cache.find(val => val.name === db.modlogchannel);
	   let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setThumbnail(target.displayAvatarURL)	  
	  .setColor("#FF0000")
	  .addField("Case #"+number.toString()+" | "+action, `User : ${target.tag} ID: ${target.id}`)
	  .addField("Moderator",message.member.user.tag)
	  .addField("Reason",reason)
	  .setFooter("User ID: "+target.id)
	  logChannel.send(botembed);
		}
		  }, function(error) { console.log(error); });
};