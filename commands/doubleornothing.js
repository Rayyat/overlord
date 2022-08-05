const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'doubleornothing',
    description: 'Double or Nothing game.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        TheClient.bigDB.loadOrCreate("TestBot", message.author.id, function(db) {
	      if(!args[0]){
			  return client.emit("cmderr",message,"Please specify a number to gamble!!");
		  }
		  var risk = parseInt(args[0]);
		  if(isNaN(parseInt(args[0])))
		  {
			  return;
		  }
		  if(isNaN(args[0])) return;
		  if(!args[0]) return;
		  if(risk>db.dollars){
			  return;
		  }
		  if(risk <1){
			  return;
          }
		  var i = mod.getRndInteger(0,1);
		  if(i == 0)
		  {
			  db.dollars = db.dollars - (risk);
			  db.save();
			  let botembed = new Discord.MessageEmbed()
			  .setAuthor(message.author.tag, message.author.avatarURL)
			  .setTimestamp()
			  .setColor(mod.getRandomColor())
			  .addField("Sorry!!","You lost **"+risk.toString()+"** :dollar: !!")
              return message.channel.send(botembed);
		  }
		  if(i == 1)
		  {
			  db.dollars = db.dollars + (risk);
			  db.save();
			  let botembed = new Discord.MessageEmbed()
			  .setAuthor(message.author.tag, message.author.avatarURL)
			  .setTimestamp()
			  .setColor(mod.getRandomColor())
			  .addField("Congratulations!!","You have won **"+(risk*2).toString()+"** :dollar: !!")
              return message.channel.send(botembed);
		  }
		  }, function(error) { console.log(error); });
    },
};