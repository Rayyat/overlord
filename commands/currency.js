const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'currency',
    description: 'Shows currency information.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!args[0]){
	   TheClient.bigDB.loadOrCreate("TestBot", message.author.id, function(db) {
		   var ch = false;
		   if(db.dollars == null)
		   {
			   db.dollars = 500;
			   ch = true;
		   }
		   if(db.dailydate == null)
		   {
			   db.dailydate = Date.now();
			   ch = true;
		   }
		   if(db.name == null)
		   {
			   db.name = message.author.tag;
			   ch = true;
		   }	
           if(ch == true){
			   db.save();
		   }			   
		   let botembed = new Discord.MessageEmbed()
		  .setAuthor(message.author.tag, message.author.avatarURL)
		  .addField("Dollars", db.dollars +" :dollar:")
          .setColor(mod.getRandomColor())
		  .setDescription("Currency info for "+message.author.tag)
	      return message.channel.send(botembed);
		   
		   }, function(error) { console.log(error); });
	  }
	  else{
		  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		  if(!member)
			   return message.channel.send("Error: Member not found.");
		  TheClient.bigDB.loadOrCreate("TestBot", member.user.id, function(db) {
		   if(!db.dollars)
		   {
			   return message.channel.send("This user has not been registered yet.");
		   }	   
		   let botembed = new Discord.MessageEmbed()
		  .setAuthor(member.user.tag, member.user.avatarURL)
		  .addField("Dollars", db.dollars +" :dollar:")
          .setColor(mod.getRandomColor())
		  .setDescription("Currency info for "+member.user.tag)
	      return message.channel.send(botembed);
		   
		   }, function(error) { console.log(error); });
	  }
    },
};