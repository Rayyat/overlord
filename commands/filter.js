const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'filter',
    description: 'Shows filtered words.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!isAdmin && !isMod){
		  return;
	  }
	  if(isMod){
		  if(!modcommand.includes(module.exports.name)){
				  return;
		      }
	  }
	  TheClient.bigDB.loadOrCreate("Guilds", message.guild.id, function(db) {
		  if(!args[0]){
      let botembed = new Discord.RichEmbed()
	   .setAuthor(client.user.username, client.user.avatarURL)
	   .setTimestamp()
	   .addField("Filter","Here you can see filtered words list in your server. \n You can add words to filter using `"+client.prefix+"filter add <word>`. \n You can remove words from filter using `"+client.prefix+"filter del <word>`.")
	   .addField("Filtered words list for "+message.guild.name+" :",mod.listarray(db.filter))
	   .setColor(mod.getRandomColor())
	  return message.channel.send(botembed);
		  }
		  if(args[0] === "add"){
			  if(!db.filter.includes(args.slice(1).join(" "))){
	  db.filter.push(args.slice(1).join(" "));
	  db.save();
	  return client.emit("success",message,"Word "+args.slice(1).join(" ")+" added to filter.");
	  }
	  else{
		  return client.emit("cmderr",message,"Word "+args.slice(1).join(" ")+" already exists in filter!!.");
	  }
		  }
		  if(args[0] === "remove" ||args[0] === "del"||args[0] === "delete"){
			   var index = db.filter.indexOf(args.slice(1).join(" "));
      if (index > -1) {
        db.filter.splice(index, 1);
		db.save();
      }
	  else{
		  return client.emit("cmderr",message,"That word doesn't exist in filter!!");
	  }
	  return client.emit("success",message,"Word "+args.slice(1).join(" ")+" deleted from filter.");
		  }
  }, function(error) { console.log(error); });
	  
    },
};