const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'warn',
	cooldown: 0.1,
    description: 'Warns the specified user with a DM with specified message.',
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
		  let botembed = new Discord.MessageEmbed()
	      .addField("Command Information", "`"+client.prefix+"warn <ID/mention> <message>`")
		  .addField("Function", "Warns the specified user with a DM with specified message.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	  }
	  if(!args.slice(1).join(' ')){
		  return client.emit("cmderr",message,"Please specify a warning message!!");
	  }
	  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!member)
      return client.emit("cmderr",message,"Please mention a valid member of this server");
    member.send("You have been warned in "+message.member.guild.name+": "+args.slice(1).join(' ')).then(() =>{ 
	client.emit("modLog",client,message,"Warn",member.user,args.slice(1).join(' '),TheClient)
	return client.emit("success",message,"The member **"+member.user.tag+"** has been successfully warned.")
	}).catch(error => client.emit("cmderr",message,`${error}`));  
    },
};