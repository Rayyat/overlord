const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'leet',
    description: 'Sends the same message that you had sent, but as leet text.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
    if (args.length < 1) {
     let embed = new Discord.MessageEmbed()
     .setTimestamp()
     .setColor(mod.getRandomColor())
     .setDescription("**Error:**You have to specify text to convert into 1337sp34k!!")
     .setFooter("Requested by "+ message.author.tag)
     return message.channel.send(embed)
     }
       args = args.join(' ');
       args = args.replace(/a/ig, '4');
       args = args.replace(/e/ig, '3');
       args = args.replace(/l/ig, '1');
       args = args.replace(/o/ig, '0');
       args = args.replace(/s/ig, '5');
       args = args.replace(/t/ig, '7');
     let embed = new Discord.RichEmbed()
     .setTimestamp()
     .setColor(mod.getRandomColor())
     .addField("Leet Text",args)
     .setFooter("Requested by "+ message.author.tag)
     return message.channel.send(embed)
    },
};