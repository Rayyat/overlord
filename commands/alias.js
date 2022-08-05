const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'alias',
	cooldown: 0.1,
    description: 'Allows you to manage command aliases.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         if(!isAdmin){
		  return;
	  }
	  TheClient.bigDB.loadOrCreate("Guilds", message.member.guild.id, function(db) {
      if(!args[0])
	  {	  
	  let botembed = new Discord.MessageEmbed()
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .addField("Aliases", "Here you can make command aliases with `*alias [add/del] aliasname commandname`.")
          .setColor(mod.getRandomColor())
		   var lsi = "";
		   if(db.aliases.length != 0)
		   {
	     for (let i = 0; i < db.aliases.length; i++) {
		 if(i == 0){
			 lsi = "`"+db.aliases[i]+"`";
		 }
		 else{
			 lsi = lsi +" ,`"+db.aliases[i]+"`";
		 }
		 
	  }
		   }
		   else{
			   lsi = "No aliases in this server.";
		   }
		   botembed.addField("Alias list",lsi)
		   return message.channel.send(botembed);
	  }
	  if(args[0] == "add")
	  {	
	  db.aliases.push(args[1]+":"+args.slice(2).join(' '));
	  db.save();
	  return client.emit("success",message,"Alias "+args[1]+" added.");
	  }
	  if(args[0] == "del")
	  {	  
       for (let i = 0; i < db.aliases.length; i++) {
		   if(db.aliases[i].startsWith(args.slice(1).join(' ')))
		   {
			   db.aliases.splice(i, 1);
		       db.save();
			   return client.emit("success",message,"Alias "+args[1]+" removed.");
		   }
       }
	  return client.emit("cmderr",message,"Alias with this name does not exist.");
	  }
	}, function(error) { console.log(error); });
    },
};