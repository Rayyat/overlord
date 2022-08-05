const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
var fortuneCookies = require("../utils/fortune.json");
module.exports = {
    name: 'fortune',
    description: 'Shows you a fortune from a fortune cookie.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {      
    let embed = new Discord.RichEmbed()
     .setTimestamp()
     .setColor(mod.getRandomColor())
     .setFooter("Requested by "+ message.author.tag)
     .setDescription(fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)])
     return message.channel.send(embed)
    },
};