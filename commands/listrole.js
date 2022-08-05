const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'listrole',
	cooldown: 0.1,
    description: 'Lists who is in the given role.',
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
	      .addField("Command Information", "`[p]listrole <role name>`")
		  .addField("Function", "Lists who is in the given role.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	  }
	  let role = message.member.guild.roles.cache.find(val => val.name === args.slice(0).join(' '));
	  if(!role)
	  {
		  role = message.member.guild.roles.cache.find(val => (val.name.startsWith(args.slice(0).join(' '))));
		 // return message.channel.send("Error: Role not found.");
	  }
	  if(!role)
	  {
		  return client.emit("cmderr",message,"Role not found.");
	  }
	  var lsi = "No members with this role.";
	   for (let i = 0; i < role.members.array().length; i++) {
		 if(i == 0){
			 lsi = "`"+role.members.array()[i].user.tag+"`";
		 }
		 else{
			 lsi = lsi +" ,`"+role.members.array()[i].user.tag+"`";
		 }
	  }
	  let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .addField("List Role", "Here's a list of all the members who has the role `"+ role.name+"` !!")
	  .addField("Role Name: "+role.name, lsi)
	  .setFooter("Requested by "+message.author.tag)
	  .setTimestamp()
	  .setColor(role.hexColor)
	//  console.log(role.members.array())
	  return message.channel.send(botembed); 
    },
};