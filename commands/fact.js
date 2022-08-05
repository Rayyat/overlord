const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'fact',
    description: 'Gives a random fact.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        var request = require('request');
      var xml2js = require('xml2js');
      request("http://www.fayd.org/api/fact.xml", function(error, response, body) {
        if (!error && response.statusCode == 200) {
          xml2js.parseString(body, function(err, result) {
            message.channel.send(result.facts.fact[0]);
          });
        } else {
          message.channel.send("Got an error: ", error, ", status code: ", response.statusCode);
        }
      });
    },
};