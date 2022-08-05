const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'ban',
    description: 'Bans the specified user with specified reason.',
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
	      .addField("Command Information", "`"+client.prefix+"ban <ID/mention> <reason>`")
		  .addField("Function", "Bans the specified user with specified reason.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	}
	if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
      return client.emit("missingPerms",message,"I need the `Ban Members` permission for this command!!");
    }
    let member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]);
    if(!member)
      return client.emit("cmderr",message,"Please mention a valid member of this server");
    if(!member.bannable) 
      return client.emit("cmderr",message,"I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' '); 
    if(!reason) reason = "No reason provided";
    await member.ban(reason).then(() =>{
		client.emit("modLog",client,message,"Ban",member.user,reason,TheClient)
		return client.emit("success",message,`${member.user.tag} has been banned by ${message.author.tag}. \n **Ban Reason:** ${reason}`);
		}).catch(error => client.emit("cmderr",message,`Sorry ${message.author} I couldn't ban because of : ${error}`));
    },
};