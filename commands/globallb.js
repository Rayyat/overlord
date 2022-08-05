const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'globallb',
	cooldown:10,
    description: 'Global currency leaderboard.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        TheClient.bigDB.loadRange("TestBot", "dollars", null, null, null, 10, function(objects) {
		  let botembed = new Discord.MessageEmbed()
		  .setAuthor(client.user.username, client.user.avatarURL)
		  .addField("Global Leaderboard", "The richest players from the world!!")
          .setColor(mod.getRandomColor())
		  for (var i = 0; i < objects.length; i++) {
          botembed.addField((i+1).toString()+". "+objects[i].name, "**"+objects[i].dollars.toString()+"** :dollar:")
          }
		  return message.channel.send(botembed);
    }, function(error) { console.log(error); });
    },
};