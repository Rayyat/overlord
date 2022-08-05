const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
let botown = ["reboot" ,"uptime", "setstatus", "senddm" ,"shutdown", "reload"]
let currency = ["currency" ,"daily" ,"doubleornothing","globallb"] 
let standard = ["stats" ,"8ball", "fact" ,"userinfo" ,"server" ,"reverse" ,"fliptext" ,"destruct", "shoot", "toss" ,"xkcd", "catfact" ,"dogfact" ,"color" ,"info" ,"emojiinfo", "quote", "channel" ,"crimerate", "fortune", "leet" ,"robotify" ,"rps", "ship" ,"pun" ,"zalgolize" ,"invite"]
let admin = ["setprefix", "say", "saychannel","filter", "mute" ,"unmute" ,"kick" ,"ban", "hackban", "warn", "unban", "purge", "addrole", "removerole", "logs", "roleinfo" ,"listrole" ,"welcome","alias", "modlogs", "resetcases", "ignore", "dontignore", "admins" ,"mods" ,"modcmds"] 
module.exports = {
    name: 'help',
    description: 'List of commands',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
		let modcm = mod.listmodcommand(modcommand,client.prefix)
		 let botembed = new Discord.MessageEmbed()
		 .setAuthor(client.user.username, client.user.avatarURL)
		 .addField("Help","Here is a list with all of the available commands. If you wanna join the support server type `"+client.prefix+"invite`.")
		 .setFooter("Requested by "+message.author.tag)
		 .setTimestamp()
		 .setColor(mod.getRandomColor())
		 let change = false;
  if(message.author.id === "352128199112785921" && isAdmin && !isMod&& !change)
 {
	  botembed.addField("Bot Owner commands",mod.listmodcommand(botown,client.prefix))
	  botembed.addField("Server Administrator commands",mod.listmodcommand(admin,client.prefix))
	  botembed.addField("Standard commands",mod.listmodcommand(standard,client.prefix))
	  botembed.addField("Currency commands",mod.listmodcommand(currency,client.prefix))
	  change = true;
 }
 if(message.author.id === "352128199112785921" && !isAdmin && !isMod&& !change)
 {
	  botembed.addField("Bot Owner commands",mod.listmodcommand(botown,client.prefix))
	  botembed.addField("Standard commands",mod.listmodcommand(standard,client.prefix))
	  botembed.addField("Currency commands",mod.listmodcommand(currency,client.prefix))
	  change = true;
 }
 if(message.author.id === "352128199112785921" && !isAdmin && isMod&& !change)
 {
	  botembed.addField("Bot Owner commands",mod.listmodcommand(botown,client.prefix))
	  botembed.addField("Server Moderator commands",modcm)
	  botembed.addField("Standard commands",mod.listmodcommand(standard,client.prefix))
	  botembed.addField("Currency commands",mod.listmodcommand(currency,client.prefix))
	  change = true;
 }
  if(!isAdmin && !isMod && !change)
  {
	  botembed.addField("Standard commands",mod.listmodcommand(standard,client.prefix))
	  botembed.addField("Currency commands",mod.listmodcommand(currency,client.prefix))
	  change = true;
  }
 if(isAdmin && !isMod&& !change)
 {
	  botembed.addField("Server Administrator commands",mod.listmodcommand(admin,client.prefix))
	  botembed.addField("Standard commands",mod.listmodcommand(standard,client.prefix))
	  botembed.addField("Currency commands",mod.listmodcommand(currency,client.prefix))
	  change = true;
 }
  if(!isAdmin && isMod&& !change)
 {			 
    botembed.addField("Server Moderator commands",modcm)
	  botembed.addField("Standard commands",mod.listmodcommand(standard,client.prefix))
	  botembed.addField("Currency commands",mod.listmodcommand(currency,client.prefix))
	  change = true;
	 
 }
 return message.channel.send(botembed);

    },
};