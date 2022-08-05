const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'server',
    description: 'Shows information about the server.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         const millis = new Date().getTime() - message.guild.createdAt.getTime();
       const days = millis / 1000 / 60 / 60 / 24;
       const owner = message.guild.owner.user || {};
       const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
       return message.channel.send({embed: {
      color: Math.floor(Math.random()*16777215),
      author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
      },
	  description: "Server info of "+message.guild.name,      
    fields: [{
            
                name: 'Created On',
                value: message.guild.createdAt.toString().split(' ')[1]+" "+message.guild.createdAt.toString().split(' ')[2]+" "+message.guild.createdAt.toString().split(' ')[3]
            },
            {
                name: 'Days Since Creation',
                value: `${days.toFixed(0)}`,
				inline: true,
            },
            {
                name: 'Region',
                value: `${message.guild.region}`,
				inline: true,
            },
            {
                name: 'Member Count',
                value: `${message.guild.members.cache.filter(member => member.presence.status !== 'offline').size} / ${message.guild.memberCount}`,
				inline: true,
            },
            {
                name: 'Owner',
                value: `${owner.tag || 'None'}`,
				inline: true,
            },           
            {
                name: 'Verification Level',
                value: `${verificationLevels[message.guild.verificationLevel]}`,
				inline: true,
            },
            {
                name: 'Roles Count',
                value: `${message.guild.roles.size}`,
				inline: true,
            },
			{
                name: 'Guild ID',
                value: `${message.guild.id}`,
				inline: true,
            },
			/*{
                name: 'Prefix',
                value: prefix,
				inline: true,
            },*/
			
        ]
     }});	

    },
};