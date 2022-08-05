const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'kick',
	cooldown: 0.1,
    description: 'Kicks the specified user with specified reason.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!isAdmin && !isMod){
		  return;
	  }
	  if(isMod){
		  if(!modcommand.includes(module.exports.name)){
				  return;
		      }
	  }
	  if(!args[0]){
		  let botembed = new Discord.RichEmbed()
	      .addField("Command Information", "`"+client.prefix+"kick <ID/mention> <reason>`")
		  .addField("Function", "Kicks the specified user with specified reason.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	  }
	if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
	  return client.emit("missingPerms",message,"I need the `Kick Members` permission for this command!!");
    }
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
	  return client.emit("cmderr",message,"Please mention a valid member of this server, or specify an ID!");
    if(!member.kickable) 
      return client.emit("cmderr",message,"I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";		
    // Now, time for a swift kick in the nuts!
    await member.kick(reason).then(() =>{
		client.emit("modLog",client,message,"Kick",member.user,reason,TheClient)
		return client.emit("success",message,`${member.user.tag} has been kicked by ${message.author.tag} \n **Reason:** ${reason}`);
      }).catch(error => client.emit("cmderr",message,`Sorry ${message.author} I couldn't kick because of : ${error}`));
    },
};