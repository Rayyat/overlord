const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'toss',
    description: 'Toss a coin.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      var i = mod.getRndInteger(0,1);
	   if(i == 0)
          return message.reply(" Heads!");
	   if(i == 1)
          return message.reply(" Tails!");
    },
};