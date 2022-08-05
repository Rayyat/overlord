const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'setprefix',
	cooldown: 0.1,
    description: 'Sets the prefix to the specified one. Server administrators only.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      if(!isAdmin)
	      return;
	  if(!args[0]){
		  let botembed = new Discord.MessageEmbed()
	      .addField("Command Information", "`[p]setprefix <new prefix>`")
		  .addField("Function", "`Changes the prefix to the given prefix.`")
		  .setColor(mod.getRandomColor())
		  .setTimestamp()
		  return message.channel.send(botembed);
	  }
	  if(args[0].length >3)
		  return;
	  TheClient.bigDB.loadOrCreate("Guilds", message.guild.id, function(db) {
		  db.prefix = args[0];
		  db.save();
		  let botembed = new Discord.MessageEmbed()
			 .setAuthor(client.user.username, client.user.avatarURL)
			 .addField("Custom Prefix", "Prefix for "+message.guild.name+" successfully set as `"+args[0]+"`.")
             .setColor(mod.getRandomColor())
			 .setTimestamp()
			 return message.channel.send(botembed);
	  }, function(error) { console.log(error); });
    },
};