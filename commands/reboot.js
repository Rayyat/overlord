const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
const config = require("../config.json");
module.exports = {
    name: 'reboot',
	botowneronly:true,
	cooldown: 0.1,
    description: 'reboots',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      if(message.author.id != "490222491231584266"){
		  return;
	  }
	  message.channel.send("Rebooting...");
	  client.destroy()
      client.login(config.token);
    },
};