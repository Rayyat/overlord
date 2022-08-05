const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'catfact',
    description: 'Gives a random fact about cats.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        var request = require('request');
      request("https://catfact.ninja/fact", function(error, response, body) {
        if (!error && response.statusCode == 200) {
			var roll = JSON.parse(body);      
            return message.channel.send(roll.fact);
        } else {
          message.channel.send("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
    },
};