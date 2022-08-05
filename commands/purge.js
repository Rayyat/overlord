const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'purge',
	cooldown: 0.1,
    description: 'Purges messages.',
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
	      .addField("Command Information", "`"+client.prefix+"purge <amount of messages>`")
		  .addField("Function", "Purges messages.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
     }
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 1 || deleteCount > 99)
      return message.reply("Please provide a number between 1 and 99 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?

    message.channel.bulkDelete(deleteCount, true).catch(err => {
      console.error(err);
      message.channel.send('there was an error trying to prune messages in this channel!').then(msg => {
        msg.delete({timeout: 3000});
      });
    }).then(()=>{
      message.channel.send("Consider it done :)").then(msg => {
        msg.delete({timeout: 3000});
      });
    });
    },
};