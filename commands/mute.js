const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'mute',
	cooldown: 0.1,
    description: 'Mutes the specified user with specified reason.',
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
	      .addField("Command Information", "`"+client.prefix+"mute <ID/mention> <reason>`")
		  .addField("Function", "Mutes the specified user with specified reason.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	  }
	  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       // console.log(args[0])
	   if(!member)
	   {return client.emit("cmderr",message,"Please mention a valid member of this server");}
	  const role = member.guild.roles.cache.find(val => val.name === "Muted");
	  if(!role)
	  {
		  return client.emit("cmderr",message,"The `Muted` role does not exist. Please create it in the admin panel.");
	  }
	  else{
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
	  await member.roles.add(role).then(() =>{		  	  
	     client.emit("modLog",client,message,"Mute",member.user,reason,TheClient)
		 client.emit("success",message,member.user.tag+" has been muted.");
	     }).catch(error => client.emit("cmderr",message,`Sorry ${message.author} I couldn't mute ${member.user.tag} because of : ${error}`));
	  }
    },
};