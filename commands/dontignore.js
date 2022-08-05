const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'dontignore',
    description: 'Stops ignoring the given channel.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!isAdmin && !isMod){
		  return;
	  }
	  if(isMod){
		  if(!modcommand.includes(module.exports.name)){
				  return;
		      }
	  }
	  TheClient.bigDB.loadOrCreate("Guilds", message.member.guild.id, function(db) {
		  if(db.ignoredChannels.includes(message.channel.id))
		  {
	  for (let i = 0; i < db.ignoredChannels.length; i++) {
		   if(db.ignoredChannels[i] == message.channel.id)
		   {
			   db.ignoredChannels.splice(i, 1);
		       db.save();
			   return client.emit("success",message,"This channel is now not ignored anymore by the bot.");
		   }
       }
	   }
	   else{
			  return client.emit("cmderr",message,"This channel is already not ignored.");
		  }
	   }, function(error) { console.log(error); });
    },
};