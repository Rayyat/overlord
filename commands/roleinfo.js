const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'roleinfo',
	cooldown: 0.1,
    description: 'Shows information about the given role.',
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
	      .addField("Command Information", "`"+client.prefix+"roleinfo <role name>`")
		  .addField("Function", "Shows information about the given role.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	  } 
	  let role = message.member.guild.roles.find(val => (val.name === args.slice(0).join(' ')));
	  if(!role)
	  {
		  role = message.member.guild.roles.find(val => (val.name.startsWith(args.slice(0).join(' '))));
		 // return message.channel.send("Error: Role not found.");
	  }
	  if(!role)
	  {
		  return client.emit("cmderr",message,"Role not found.");
	  }
	  let botembed = new Discord.RichEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .addField("Role Info", "Role info for `"+ role.name+"`")
	  .addField("Role ID", role.id,true)
	  .setColor(role.hexColor,true)
	  .addField("Role Color", role.hexColor ,true)
	  .addField("Members", role.members.array().length,true)
	  .addField("Mention", "`<@&"+role.id+">`",true)
	  .addField("Position", role.position.toString(),true)
	  .addField("Is Hoisted ?", role.hoist,true)
	  .addField("Is Mentionable?", role.mentionable,true)
	  .setTimestamp()
	//  console.log(role.members.array())
	  return message.channel.send(botembed);

    },
};