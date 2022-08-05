const Discord = require("discord.js");
const request = require('request')
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'pun',
	cooldown:5,
    description: 'Gives a random pun.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         request('http://www.punoftheday.com/cgi-bin/arandompun.pl', function(err, res, body) {
         if (!err && res.statusCode == 200) {
			 var string = body.split('&quot;')[1].replace("&rsquo;","'")
                let botembed = new Discord.MessageEmbed()
				.setTimestamp()
				.setFooter("Requested by "+message.author.tag)
		        .setDescription(string)
				.setColor(mod.getRandomColor())
				return message.channel.send(botembed);			
              } else {
                console.log("warn", "Got an error: "+ err +", status code: "+ res.statusCode);
                client.emit("cmderr",message,"Got an error: "+ err +", status code: "+ res.statusCode);
              }
    });
    },
};