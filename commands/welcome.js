const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'welcome',
    description: 'Welcome message settings.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      if(!isAdmin) return;
      TheClient.bigDB.loadOrCreate("Guilds", message.guild.id, function(db) {
       if(!args[0]){
       let idkw = "Welcome messages are not enabled in this server."
       if(db.welcome === true){
       idkw = "Welcome messages are enabled in this server."
       }
       let botembed = new Discord.MessageEmbed()
       .setTimestamp()
       .setColor(mod.getRandomColor())
       .setFooter("Requested by "+ message.author.tag)
       .setDescription(idkw)
       .addField("Welcome Message","`"+db.welcomeMsg+"`")
       .addField("Welcome Messages Channel","#"+db.welcomeChannel)
       .addField("Options","Use `"+client.prefix+"welcome setchannel <channel>` to set the welcome channel \n Use `"+client.prefix+"welcome set <message>` to set the welcome message. Use `$SERVER$` for server name, `$MENTION$` for mention user. \n You can enable/disable welcome messages using `"+client.prefix+"welcome enable/disable`.")
       return message.channel.send(botembed)
       }
       if(args[0]==="setchannel"){
       let channel = message.mentions.channels.first();
       if(!channel){       
        return client.emit("cmderr",message,"The specified channel name could not be found or I don't have access to it! \n Remember that you have to ***mention*** the channel.");
       }
        db.welcomeChannel = channel.name;
        db.save();
		return client.emit("success",message,`The welcome channel in **${channel.guild.name}** was set to **#${channel.name}.**`)
        }
		if(args[0]==="set"){
		db.welcomeMsg = args.slice(1).join(" ");
		db.save();
		return client.emit("success",message,"The welcome message for **"+message.guild.name+"** is set to`"+args.slice(1).join(" ")+"`")
		}
		if(args[0]==="enable"){
		if(db.welcome === true) return client.emit("warning",message,"Welcome messages are already enabled in this server.")
		if(db.welcomeChannel ==="No Channel Specified Yet") return client.emit("warning",message,"You need to specify a channel before enabling welcome messages. Please specify a channel using `"+client.prefix+"welcome setchannel <channel>`");
		db.welcome = true
		db.save();
		return client.emit("success",message,"The welcome message for **"+message.guild.name+"** has been successfully enabled.")
		}
		if(args[0]==="disable"){
		if(db.welcome == false) 
			return client.emit("cmderr",message,"Welcome messages are already disabled in this server.")
	    db.welcome = false
		db.save();
		return client.emit("success",message,"The welcome message for **"+message.guild.name+"** has been successfully disabled.")
		}
       }, function(error) { console.log(error); });
    },
};