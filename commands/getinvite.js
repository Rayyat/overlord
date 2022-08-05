const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'getinvite',
	botowneronly:true,
    description: 'gets invite bot owner only',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(message.member.id != "490222491231584266"){
		  return;
	  }
	  const guild = client.guilds.cache.find(val => val.id === args[0]);	  
	  if(!guild){
		  return message.reply("Guild could not be found!!");
	  }	  guild.fetchInvites().then(guildInvites => {
		//  console.log(guildInvites.find(invite => invite.inviter.id === guild.ownerID).code)
		//  console.log(guildInvites)
	  message.channel.send(guildInvites.cache.find(invite => invite.inviter.id === guild.ownerID).code);
    })
	return message.channel.send("All invites for guild "+guild.name+" given");
    },
};