const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'shoot',
	cooldown: 10,
    description: 'Shoot your friends.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	   if(!member)
	   {return client.emit("cmderr",message,"You haven't mentioned/used the ID of a valid user.");}
      if(member == message.guild.members.cache.get(message.author.id)){
	     return client.emit("cmderr",message,"You cannot shoot yourself or bots.");
	  }
	  if(member.user.bot){
	     return client.emit("cmderr",message,"You cannot shoot yourself or bots.");
	  }
    var i = mod.getRndInteger(0,3);//0 1 2 3
 //  message.delete();
   if(i == 0||i == 1){
   let botembed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL)
   .setColor(mod.getRandomColor())
   .addField(`Missed!`, `Sorry you've missed your shot!`,true)
   .setTimestamp()
    return message.channel.send(botembed);
   }
   else if(i == 2){
	let botembed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL)
   .setColor(mod.getRandomColor())
   .addField(`${message.member.user.username} has shot his target! But the target has escaped!`, `Sorry, ${member.user.tag} escaped!!`,true)
   .addField("Loot","**50** :dollar:")
   .setTimestamp()
   TheClient.bigDB.loadOrCreate("TestBot", message.author.id, function(db) {
	   db.dollars = db.dollars +50;
	   db.save();
	    }, function(error) { console.log(error); });
    return message.channel.send(botembed);
   }
   else if(i == 3){
	let botembed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL)
   .setColor(mod.getRandomColor())
   .addField(`${message.member.user.username} is on a killing spree!`, `**${member}** :gun:`,true)
   .addField("Loot","**125** :dollar:")
   .setTimestamp()
   TheClient.bigDB.loadOrCreate("TestBot", message.author.id, function(db) {
	   db.dollars = db.dollars +125;
	   db.save();
	    }, function(error) { console.log(error); });
    return message.channel.send(botembed);
   }
    },
};