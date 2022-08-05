const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'ignore',
    description: 'Ignores the channel by ignoring messages from non-staffs.',
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
		  if(!db.ignoredChannels.includes(message.channel.id))
		  {
		  db.ignoredChannels.push(message.channel.id)
		  db.save();
		  return client.emit("success",message,"This channel is now ignored by the bot.");
		  }
		  else{
			  return client.emit("cmderr",message,"This channel is already ignored.");
		  }
		   }, function(error) { console.log(error); });
    },
};