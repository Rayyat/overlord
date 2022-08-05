const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'log',
	botowneronly:true,
	cooldown: 0.1,
    description: 'Logs to console',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        console.log(args.join(' '))
    },
};