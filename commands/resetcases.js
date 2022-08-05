const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'resetcases',
	cooldown: 0.1,
    description: 'Resets modlogs cases.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      if(!isAdmin)
		  return;
	   TheClient.bigDB.loadOrCreate("Guilds", message.guild.id, function(db) {
		   db.modlogscase = 1;
		   db.save();
		   return client.emit("success",message,"Moderation logs cases has been reset for "+message.guild.name)
		    }, function(error) { console.log(error); });
    },
};