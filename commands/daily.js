const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'daily',
    description: 'Daily currency',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        TheClient.bigDB.loadOrCreate("TestBot", message.author.id, function(dbObj) {	 
		   if(Date.now()>=dbObj.dailydate)
		   {			  		 
			   dbObj.dollars = dbObj.dollars+500;
			   var onemore=new Date();
			   onemore = onemore.setDate(onemore.getDate()+1);
			   dbObj.dailydate = onemore;
			   dbObj.save();
			    let botembed = new Discord.MessageEmbed()
			  .setAuthor(message.author.tag, message.author.avatarURL)
			  .setTimestamp()
			  .setColor(mod.getRandomColor())
			  .addField("Success!!","You got 500 :dollar:!!")
              return message.channel.send(botembed);	
		   }
		   else{
			   var timeDiff = dbObj.dailydate - Date.now();
               var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			 //  var days = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			  // var hours = Math.ceil(timeDiff / (1000 * 3600 )); 
			 //  var minutes = Math.ceil(timeDiff / (1000 )); 
			 var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
             timeDiff -=  days * (1000 * 60 * 60 * 24);
             var hours = Math.floor(timeDiff / (1000 * 60 * 60));
             timeDiff -= hours * (1000 * 60 * 60);
             var mins = Math.floor(timeDiff / (1000 * 60));
             timeDiff -= mins * (1000 * 60);
             var seconds = Math.floor(timeDiff / (1000));
             timeDiff -= seconds * (1000);
			 let botembed = new Discord.MessageEmbed()
			  .setAuthor(message.author.tag, message.author.avatarURL)
			  .setTimestamp()
			  .setColor(mod.getRandomColor())
			  .addField("Not yet!!","For your next daily, **"+ days+ "** days, **"+hours+"** hours, **"+mins+"** minutes, **"+seconds+"** seconds left.")
              return message.channel.send(botembed);
		   }
		   }, function(error) { console.log(error); });
    },
};