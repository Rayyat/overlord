const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'dogfact',
    description: 'Gives a random fact about dogs.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        var request = require('request');
      request("https://dog-api.kinduff.com/api/facts", function(error, response, body) {
        if (!error && response.statusCode == 200) {
			var roll = JSON.parse(body);      
            return message.channel.send(roll.facts);
        } else {
          message.channel.send("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
    },
};