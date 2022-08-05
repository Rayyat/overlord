const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: '8ball',
    description: 'Ask a question and the bot will answer',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         var request = require('request');
      request('https://8ball.delegator.com/magic/JSON/0', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var eightBall = JSON.parse(body);
          message.channel.send(":8ball: "+eightBall.magic.answer + ", " + message.author);
        } else {
          message.channel.send("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
    },
};