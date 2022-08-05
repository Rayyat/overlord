const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'hackban',
    description: "Ban a user by their ID, even if they haven't joined your server.",
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
    if(!isAdmin && !isMod){
		  return;
	  }
	  if(isMod){
		  if(!modcommand.includes(module.exports.name)){
				  return;
		      }
	  }
	 if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
		return client.emit("missingPerms",message,"I need the `Ban Members` permission for this command!!");
     }
	 if(!args[0]){
		let botembed = new Discord.MessageEmbed()
		.addField("Command Information", "`"+client.prefix+"hackban <ID> <reason>`")
		.addField("Function", "Preemptively bans the specified ID with specified reason.")
		.setColor(mod.getRandomColor())
		return message.channel.send(botembed);
	   }
	  if(message.guild.members.cache.get(args[0])){
		  let error = new Discord.MessageEmbed()
		  .setTimestamp()
          .setColor(mod.getRandomColor())
          .setFooter("Requested by "+ message.author.tag)
          .setDescription("This member is already in your server. Use `"+client.prefix+"ban "+args[0]+" <reason>` instead.")
		  return message.channel.send(error)
	  }
	  var reason = args.slice(1).join(' ');
	  if(!args[1]) reason = "No reason provided";
	  client.users.fetch(args[0]).then(async user => {
    message.guild.members.ban(user).then(async() =>{
		 client.emit("modLog",client,message,"Preemptive ban",user,reason,TheClient)
		 return client.emit("success",message,"Successfully banned the ID `"+args[0]+"`");
    }).catch(err => {
		return client.emit("cmderr",message,"The ID `"+args[0]+"` is not a valid user.");
	})
}).catch(err => {
	return client.emit("cmderr",message,"The ID `"+args[0]+"` is not a valid user.");
})
    },
};