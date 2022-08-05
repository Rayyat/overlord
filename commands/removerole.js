const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'removerole',
	cooldown: 0.1,
    description: 'Removes the specified role from the specified person.',
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
	      .addField("Command Information", "`[p]removerole <ID/mention> <role name>`")
		  .addField("Function", "Removes the specified role from the specified person.")
		  .setColor(getRandomColor())
		  return message.channel.send(botembed);
	  }
	  if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
      return client.emit("missingPerms",message,"I need the `Manage Roles` permission for this command!!");
      }
	 // let parsed = args.join(" ").split("$");
	  let myrole = message.guild.me.roles.cache.find(val => val.name === client.user.username);
	  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      //  console.log(args[0])
	   if(!member)
	   {return message.reply("Please mention a valid member of this server");}
	 let role = member.guild.roles.cache.find(val => val.name === args.slice(1).join(" "));
	  if(!role)
	  {
		  role = member.guild.roles.cache.find(val => (val.name.startsWith(args.slice(1).join(' '))));
		 // return message.channel.send("Error: Role not found.");
	  }
	  if(!role)
	  {
		  return client.emit("cmderr",message,"Role not found ("+args.slice(1).join(" ")+")");
	  }
	  if(!member.roles.cache.find(val => val.name ===role.name))
	  {
		  return client.emit("cmderr",message,"The given member does not have the specified role ("+role.name+") to be removed!!.");
	  }
	  if(myrole){
	  if(myrole.position < role.position){
		 return client.emit("cmderr",message,"The given role("+role.name+") is higher than my role. Move my role higher from that role.");
	  }
	  }
	  await member.roles.remove(role).then(() =>{
		  return client.emit("success",message,"Role `"+role.name+"` has been succesfully removed from "+member.user.tag);
	     }).catch(error => client.emit("cmderr",message,`Sorry ${message.author} I couldn't remove the role from ${member.user.tag} because of : ${error}`));
    },
};