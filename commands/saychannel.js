const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'saychannel',
	cooldown: 0.1,
    description: 'Sends the specified message to specified channel.',
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
	      .addField("Command Information", "`"+client.prefix+"saychannel <channel> <message>`")
		  .addField("Function", "Sends the specified message to specified channel.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	  }
	const channelname = message.mentions.channels.first();
    const sayMessage = args.slice(1).join(' ');
	if(!channelname)
	{
		return client.emit("cmderr",message,"The specified channel name could not be found or I don't have access to it! \n Remember that you have to ***mention*** the channel.");
	}
	channelname.send(sayMessage);
   // message.delete().catch(O_o=>{}); 
    },
};