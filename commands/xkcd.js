const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'xkcd',
    description: 'Gives a random XKCD meme.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        var request = require('request');
       request('http://xkcd.com/info.0.json', function(error, response, body) {
	  var xkcdInfo = JSON.parse(body);
	  var xkcdRandom = Math.floor(Math.random() * (xkcdInfo.num - 1)) + 1;
            request('http://xkcd.com/' + xkcdRandom + '/info.0.json', function(error, response, body) {
              if (!error && response.statusCode == 200) {
                xkcdInfo = JSON.parse(body);
                message.channel.send(xkcdInfo.img);
              } else {
                console.log("warn", "Got an error: ", error, ", status code: ", response.statusCode);
              }
            });
			  });
    },
};