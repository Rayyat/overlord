const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'channel',
    description: 'Shows information of a specified text or voice channel of your Discord server.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         let channel = message.mentions.channels.first();
  if (!channel) {
    if (parseInt(args[0]) < 9223372036854775807) {
      channel = message.guild.channels.get(args[0]);
    }
    else channel = message.channel;
  }

  if (channel) {
    let title;
    if (channel.type === 'text') {
      title = 'Text Channel Info';
    }
    else {
      title = 'Voice Channel Info';
    }
    let embedd = new Discord.MessageEmbed()
     .setTimestamp()
     .setColor(mod.getRandomColor())
     .setFooter("Requested by "+ message.author.tag)
     .setTitle(title+" for #"+channel.name)
     .addField("Name","#"+channel.name,true)
     .addField("ID",channel.id,true)
     .addField("Topic",(channel.topic === null || channel.topic.length < 2) ? '-' : channel.topic,false)
     .addField("Created At",channel.createdAt.toUTCString(),true)
     .addField("Users",channel.members.size,true)
     return message.channel.send(embedd)
  }
  else {
	  return client.emit("cmderr",message,"The specified channel could not be found.");
  }
    },
};