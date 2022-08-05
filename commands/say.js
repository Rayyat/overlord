const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'say',
	cooldown: 0.1,
    description: 'Repeats the given message in the channel.',
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
	      .addField("Command Information", "`[p]say <message>`")
		  .addField("Function", "Repeats the given message in the channel.")
		  .setColor(mod.getRandomColor())
		  .setTimestamp()
		  return message.channel.send(botembed);
	  }
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    return message.channel.send(sayMessage);
    },
};