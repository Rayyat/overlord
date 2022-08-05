const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'senddm',
	botowneronly:true,
    description: 'Sends an anonymous DM to the user.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
     /* if(message.member.id != "490222491231584266"){
		  return;
	  }*/
	  let member = message.mentions.members.first() || client.users.get(args[0]) 
    if(!member)
      return client.emit("cmderr",message,"Please mention a valid member of this server");
    member.send(args.slice(1).join(' ')).then(() =>{
		return client.emit("success",message,`Successfully sent a DM to **${member.tag}.**`);
		}).catch(error => client.emit("cmderr",message,`Sorry ${message.author} I couldn't send DM because of : ${error}`));
    },
};