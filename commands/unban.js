const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'unban',
	cooldown: 0.1,
    description: 'Unbans the specified user.',
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
	      .addField("Command Information", "`"+client.prefix+"unban <ID/mention> <reason>`")
		  .addField("Function", "Unbans the specified user.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	}
	if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
      return client.emit("missingPerms",message,"I need the `Ban Members` permission for this command!!");
    }
	var reason = args.slice(1).join(' ');
	  if(!args[1]) reason = "No reason provided";
    await message.guild.members.unban(args[0]).then(async() =>{
		const user = await client.fetchUser(args[0])
		client.emit("modLog",client,message,"Unban",user,reason,TheClient)
		return client.emit("success",message,"Successfully unbanned `"+user.tag+"`");		
      }).catch(error =>  {
		return client.emit("cmderr",message,"The ID `"+args[0]+"` is not a valid user or is not banned.")});     
    },
};