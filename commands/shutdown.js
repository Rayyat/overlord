const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'shutdown',
	cooldown: 0.1,
    description: 'shutdown the bot',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      if(message.member.id != "490222491231584266"){
		  return;
	  }
	  message.channel.send("Shutting down..");
	  client.destroy()
    },
};