const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'userinfo',
    description: 'Shows user information of specific user.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!args[0]){
		  let botembed = new Discord.MessageEmbed()
	      .addField("Command Information", "`[p]userinfo <ID/mention>`")
		  .addField("Function", "Shows user information of specific user.")
		  .setColor(mod.getRandomColor())
		  return message.channel.send(botembed);
	  }
	  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //|| client.users.fetch(args[0]);
	   if(!member)
	   {return client.emit("cmderr",message,"You haven't mentioned/used the ID of a valid user.");}
      let roles = member.roles.cache.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
      if (roles.length < 1) roles = ['None'];
	  const millisJoined = new Date().getTime() - member.joinedAt.getTime();
      const daysJoined = millisJoined / 1000 / 60 / 60 / 24;
      return message.channel.send({embed: {
      color: Math.floor(Math.random()*16777215),
      author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
      },
      description: "User info for "+member.user.tag,
	  thumbnail: {
      url: member.user.displayAvatarURL
      },
	  fields: [{
        name: "User ID",
        value: member.id
      },
      {
        name: "Account Created On",
        value: member.user.createdAt.toString().split(' ')[1]+" "+member.user.createdAt.toString().split(' ')[2]+" "+member.user.createdAt.toString().split(' ')[3]
      },
      {
        name: "Join Date",
        value: member.joinedAt.toString().split(' ')[1]+" "+member.joinedAt.toString().split(' ')[2]+" "+member.joinedAt.toString().split(' ')[3]
      },
	  {
        name: 'Days Since Joining',
        value: `${daysJoined.toFixed(0)}`,
      },
      {
        name: "Nickname",
        value: member.user.username
      },
	  {
        name: 'Roles',
        value: `${roles.join(', ')}`,
        inline: false,
      }
      ]
      }});	 
	 
    },
};