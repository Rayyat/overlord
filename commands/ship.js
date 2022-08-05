const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'ship',
    description: 'Combines name of multiple users',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         let users = message.mentions.users.map(u => u.username);
  if (users.length < 2) {
    return message.channel.send("You need to mention at least 2 users.")
  }

  let shippedName = '';
  for (let i = 0; i < users.length; i++) {
    shippedName += `${users[i].substring(0, users[i].length / 2)}`;
  }
    let embed = new Discord.MessageEmbed()
    .setColor(mod.getRandomColor())
    .setTimestamp()
    .setTitle("Shipped Names")
    .setDescription(`${users.join(' + ')} = **${shippedName}**`)
    .setFooter("Requested by "+message.author.tag)
    return message.channel.send(embed)
    },
};