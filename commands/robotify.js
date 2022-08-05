const Discord = require("discord.js");
const request = require("request");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'robotify',
    description: 'Robotify your friends!',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
		var tag;
		var avatar;
    let user = message.mentions.users.first() || message.guild.members.get(args[0]);
     if (!user) {
    user = message.author;
	tag = message.author.tag
	avatar = message.author.avatarURL
     }
   else{
	   	tag = user.user.tag
	avatar = user.user.avatarURL
    }	
     let string = user.id;
    const embed = new Discord.RichEmbed()
    .setColor(mod.getRandomColor())
    .setTimestamp()
    .setImage(`https://robohash.org/${encodeURIComponent(string)}?set=set0`)
    .setAuthor(tag,avatar)
    .setFooter("Requested by "+message.author.tag)
    return message.channel.send(embed)
    },
};