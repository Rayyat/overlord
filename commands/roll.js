const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'roll',
    description: 'Roll the dice',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      var dice;
      if (args[0]) {
        dice = args[0];
      } else {
        dice = "d6";
      }
      var request = require('request');
      request('https://rolz.org/api/?' + dice + '.json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var roll = JSON.parse(body);
          message.channel.send("Your " + roll.input + " resulted in " + roll.result + " " + roll.details);
        } else {
          console.log("warn", "Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
    },
};