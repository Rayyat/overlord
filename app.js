// Load up the discord.js library
const Discord = require("discord.js");
const pio = require("./PlayerIOClient.minified.js");
const fs = require('fs');

const client = new Discord.Client({
    disableMentions: 'everyone',
    messageCacheMaxSize: 256,
    messageCacheLifetime: 16,
    messageSweepInterval: 2
});
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
console.log(`Loaded ${commandFiles.length} commands.`)
 let events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
  for (let event of events) {
    event = event.replace(/\.js$/i, '');

    if (event === 'ready') {
      client.on(event, () => require(`./events/${event}`));
    }
    else {
       client.on(event, require(`./events/${event}`));
    }
  }
 console.log(`Loaded ${events.length} events.`)
const invites = {};
const cooldowns = new Discord.Collection();
var TheClient = "";
// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
let filter = new Array();
let cooldown = new Set();
let cdseconds = 3;
let maindb = "TestBot";
let guilddb = "Guilds";
PlayerIO.authenticate(
    'space-flight-0cgjkoqsbkm2pwvdb50loq',    //Game id
    'public',                       //Connection id
    {  
	//register: true,
	username: "CD",
    password: "1234"},           //Authentication arguments
    {  },           
    function(clients) {
		TheClient = clients;
        //Success!
        //You can now use the client object to make API calls.
		console.log("Connected to PlayerIO");
    },
    function(error) {
       console.log(error)
    }
);
client.on('error', console.error)
async function rebootdashet(){
	  await client.destroy()
      client.login(config.token);
	  console.log("rebooting")
}
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  //console.log(client.users);
 // console.log(PlayerIO)
 
 client.guilds.cache.forEach((g) => {
	  TheClient.bigDB.loadOrCreate(guilddb, g.id, function(db) {
		//console.log(g)
		  var sthch = false;
		if(db.guildname == null)
		{
			db.guildname = g.name;
			sthch = true;
		}
		if(db.guildowner == null)
		{
			if(g.owner){
			db.guildowner = g.owner.user.tag;
			sthch = true;
			}
			/*else{
				console.log(g)
			}*/
		}
		if(db.guildownerid == null)
		{
			db.guildownerid = g.ownerID;
			sthch = true;
		}
		if(db.filter == null)
		{
			var arr = new Array();
			db.filter = arr;
			sthch = true;
		}
		if(db.aliases == null)
		{
			var arr = new Array();
			db.aliases = arr;
			sthch = true;
		}
		if(db.ignoredChannels == null)
		{
			var arr = new Array();
			db.ignoredChannels = arr;
			sthch = true;
		}
		if(db.serverAdmins == null)
		{
			var arr = new Array();
			g.members.forEach(m => {
		if(m.hasPermission("ADMINISTRATOR") && !m.user.bot){
			console.log(m.user.id);
			arr.push(m.user.id)			
		}
	});
	db.serverAdmins = arr;
	sthch = true;
		}
		if(db.serverMods == null)
		{
			var arr = new Array();
			db.serverMods = arr;
			sthch = true;
		}
		if(db.modcmds == null)
		{
			var arr = new Array();
			arr.push("ban");
			arr.push("kick");
			arr.push("say");
			arr.push("mute");
			arr.push("unmute");
			arr.push("saychannel");
			arr.push("unban");
			arr.push("purge");
			arr.push("roleinfo");
			arr.push("listrole");
			db.modcmds = arr;
			sthch = true;
		}
		if(db.joinleavelog == null)
		{
			db.joinleavelog = false;
			sthch = true;
		}
		if(db.rolelog == null)
		{
			db.rolelog = false;
			sthch = true;
		}
		if(db.banunbanlog == null)
		{
			db.banunbanlog = false;
			sthch = true;
		}
		if(db.modlogs == null)
		{
			db.modlogs = false;
			sthch = true;
		}
		if(db.adminmodlog == null)
		{
			db.adminmodlog = false;
			sthch = true;
		}
		if(db.msgdellog == null)
		{
			db.msgdellog = false;
			sthch = true;
		}
		if(db.prefix == null)
		{
			db.prefix = "*";
			sthch = true;
		}
		if(db.channellog == null)
		{
			db.channellog = false;
			sthch = true;
		}
		if(db.modlogscase == null)
		{
			db.modlogscase = 1;
			sthch = true;
		}
		if(db.logchannel == null)
		{
			db.logchannel = "log";
			sthch = true;
		}
		if(db.modlogchannel == null)
		{
			db.modlogchannel = "log";
			sthch = true;
		}
		if(db.welcome == null)
		{
			db.welcome = false;
			sthch = true;
		}
		if(db.welcomeMsg == null)
		{
			db.welcomeMsg = "Welcome to $SERVER$, $MENTION$!!";
			sthch = true;
		}
		if(db.welcomeChannel == null)
		{
			db.welcomeChannel = "No Channel Specified Yet";
			sthch = true;
		}
		if(sthch == true){
		db.save();
		}
	  }, function(error) { console.log(error); });
   /* g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });*/ //Invited function deprecated
  });
   // console.log(client)
  console.log("Overlord - a Discord bot developed by 2233#7233 - v1.1")
  console.log(`Overlord has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
 // client.emit("test","Hello!");
  client.user.setActivity(`${client.guilds.cache.size} servers`);
});
const getDefaultChannel = async (guild) => {
  // get "original" default channel
  if(guild.channels.has(guild.id))
    return guild.channels.cache.get(guild.id)
  // Check for a "general" channel, which is often default chat
  if(guild.channels.cache.find(val => val.name === "general") != null)
    return guild.channels.cache.find(val => val.name === "general");
  // Now we get into the heavy stuff: first channel in order where the bot can speak
  // hold on to your hats!
  return guild.channels
   .filter(c => c.type === "text" &&
     c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
   .sort((a, b) => a.position - b.position ||
     Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
   .first();
}
client.on("guildCreate", async guild => {
	function checkDB()
	{
    return new Promise(async resolve => {
		var sthch = false;
	TheClient.bigDB.loadOrCreate(guilddb, guild.id, function(db) {
		if(db.guildname == null)
		{
			db.guildname = guild.name;
			sthch = true;
		}
		if(db.guildowner == null)
		{
			db.guildowner = guild.owner.user.tag;
			sthch = true;
		}
		if(db.guildownerid == null)
		{
			db.guildownerid = guild.ownerID;
			sthch = true;
		}
		if(db.filter == null)
		{
			var arr = new Array();
			db.filter = arr;
			sthch = true;
		}
		if(db.aliases == null)
		{
			var arr = new Array();
			db.aliases = arr;
			sthch = true;
		}
		if(db.ignoredChannels == null)
		{
			var arr = new Array();
			db.ignoredChannels = arr;
			sthch = true;
		}
		if(db.serverAdmins == null)
		{
			var arr = new Array();
			guild.members.forEach(m => {
		if(m.hasPermission("ADMINISTRATOR") && !m.user.bot){
			console.log("aha admin buldum tırrek:"+m.user.id);
			arr.push(m.user.id)			
		}
	     });
			db.serverAdmins = arr;
			sthch = true;
		}
		if(db.serverMods == null)
		{
			var arr = new Array();
			db.serverMods = arr;
			sthch = true;
		}
		if(db.modcmds == null)
		{
			var arr = new Array();
			arr.push("ban");
			arr.push("kick");
			arr.push("say");
			arr.push("mute");
			arr.push("unmute");
			arr.push("saychannel");
			arr.push("unban");
			arr.push("purge");
			arr.push("roleinfo");
			arr.push("listrole");
			db.modcmds = arr;
			sthch = true;
		}
		if(db.joinleavelog == null)
		{
			db.joinleavelog = false;
			sthch = true;
		}
		if(db.rolelog == null)
		{
			db.rolelog = false;
			sthch = true;
		}
		if(db.msgdellog == null)
		{
			db.msgdellog = false;
			sthch = true;
		}
		if(db.banunbanlog == null)
		{
			db.banunbanlog = false;
			sthch = true;
		}
		if(db.modlogs == null)
		{
			db.modlogs = false;
			sthch = true;
		}
		if(db.adminmodlog == null)
		{
			db.adminmodlog = false;
			sthch = true;
		}
		if(db.channellog == null)
		{
			db.channellog = false;
			sthch = true;
		}
		if(db.prefix == null)
		{
			db.prefix = "*";
			sthch = true;
		}
		if(db.modlogscase == null)
		{
			db.modlogscase = 1;
			sthch = true;
		}
		if(db.logchannel == null)
		{
			db.logchannel = "log";
			sthch = true;
		}
		if(db.modlogchannel == null)
		{
			db.modlogchannel = "log";
			sthch = true;
		}
		if(db.welcome == null)
		{
			db.welcome = false;
			sthch = true;
		}
		if(db.welcomeMsg == null)
		{
			db.welcomeMsg = "Welcome to $SERVER$, $MENTION$!!";
			sthch = true;
		}
		if(db.welcomeChannel == null)
		{
			db.welcomeChannel = "No Channel Specified Yet";
			sthch = true;
		}
	    if(sthch == true){
		db.save();
		}
	  }, function(error) { console.log(error); });
			//console.log("justamember "+m.user.id);
			var ch = await getDefaultChannel(guild);
            ch.send("Hello!! I'm Overlord. I'm a Discord bot mainly for moderation/utility.");
			ch.send("The ones who have the permission 'Administrator' are automatically added to bot administrators group. You can manage bot admins using the `*admins` command. For Moderator group you can set moderator commands with `*modcmds`, and to add moderators you can use, `*setmod`. Notice that moderators only can be removed by admins, and admins can't remove the server owner. Note: I don't respond commands in DMs.");
			//m.send("Another thing is that I don't respond to commands in DMs because of possible bugs. ")
			ch.send("If you wanna have a check to the setup guide ; type `*setup` in the server!!")
	
	resolve('done')
	

	 });
	}
	var result = await checkDB();
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  TheClient.bigDB.deleteKeys(guilddb, [guild.id], function(){
    console.log(`Guild with id ${guild.id} deleted from database`);
}, function(error) { console.log(error); });
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`${client.guilds.cache.size} servers`);
});
client.on('guildMemberAdd', member => {
//	console.log("yeni adam geldi")
	TheClient.bigDB.loadOrCreate(guilddb, member.guild.id, function(db) {
		if(db.welcome == true)
		{
			const welcomeChannel = member.guild.channels.cache.find(val => val.name === db.welcomeChannel)
			let welcomestring = db.welcomeMsg.replace("$SERVER$",member.guild.name).replace("$MENTION$",member)
			let botembed = new Discord.MessageEmbed()
			.setAuthor(member.user.tag, member.user.avatarURL)
	        .setThumbnail(member.user.displayAvatarURL)	  
	        .setColor(getRandomColor())
			.addField("Welcome!!",welcomestring)
			welcomeChannel.send(botembed);
		}
		if(db.joinleavelog == true)
		{
  // To compare, we need to load the current invite list.
 // member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
   // const ei = invites[member.guild.id];
    // Look through the invites, find the one for which the uses went up.
   // const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
  //  const inviter = client.users.get(invite.inviter.id);
    // Get the log channel (change to your liking) 
    const logChannel = member.guild.channels.cache.find(val => val.name === db.logchannel);
    // A real basic message with the information we need. 
	 let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setThumbnail(member.user.displayAvatarURL)	  
	  .setColor("#00FF00")
	//  .addField("Log - Member Joined", `${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}.`)
	  .addField("Log - Member Joined", `${member.user.tag} has joined the server.`)
	  .setFooter("User ID: "+member.id)
	  return logChannel.send(botembed);
 // });
		}
   }, function(error) { console.log(error); });
});
client.on('guildMemberRemove', member => {
	TheClient.bigDB.loadOrCreate(guilddb, member.guild.id, function(db) {
		if(db.serverAdmins.includes(member.id)){
			var index = db.serverAdmins.indexOf(member.id);
          if (index > -1) {
            db.serverAdmins.splice(index, 1);
		    db.save();
          }
		}
		if(db.serverMods.includes(member.id)){
			var index = db.serverMods.indexOf(member.id);
          if (index > -1) {
            db.serverMods.splice(index, 1);
		    db.save();
          }
		}
		if(db.joinleavelog == true)
		{
    const logChannel = member.guild.channels.cache.find(val => val.name === db.logchannel);
    // A real basic message with the information we need.    
	let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setThumbnail(member.user.displayAvatarURL)	  
	  .setColor("#FF0000")
	  .addField("Log - Member Left", `${member.user.tag} has left the server.`)
	  .setFooter("User ID: "+member.id)
	  return logChannel.send(botembed);
		}
   }, function(error) { 
   console.log(error);  });
});
client.on('channelCreate', channel => {
	if(channel.type == "dm") return;
	if(channel.type == "category") return;
//	console.log(entry)
	TheClient.bigDB.loadOrCreate(guilddb, channel.guild.id, async function(db) {
		if(db.channellog == true)
		{
	const logChannel = channel.guild.channels.cache.find(val => val.name === db.logchannel);
	if (!channel.guild.me.hasPermission('VIEW_AUDIT_LOG')&& logChannel) {
      return logChannel.send("I need the `View Audit Log` permission for logging events!!");
    }
	const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
	let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL) 
	  .setColor(getRandomColor())
	  .addField("Log - Channel created", "Channel `"+channel.name+"` was created by **"+entry.executor.username+"#"+entry.executor.discriminator+"**.")
	  .addField("Details","Type:"+"`"+entry.target.type+"` NSFW Channel: `"+entry.target.nsfw+"`")
	  .setFooter("Channel ID: "+channel.id)
	return logChannel.send(botembed); 
		}
	 }, function(error) { 
   console.log(error);  });
});
client.on('channelDelete', channel => {
	if(channel.type == "dm") return;
	if(channel.type == "category") return;
	TheClient.bigDB.loadOrCreate(guilddb, channel.guild.id, async function(db) {
		if(db.channellog == true)
		{
	const logChannel = channel.guild.channels.cache.find(val => val.name === db.logchannel);
	if (!channel.guild.me.hasPermission('VIEW_AUDIT_LOG')&& logChannel) {
      return logChannel.send("I need the `View Audit Log` permission for logging events!!");
    }
	const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
	let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL) 
	  .setColor(getRandomColor())
	  .addField("Log - Channel deleted", "Channel `"+channel.name+"` was deleted by **"+entry.executor.username+"#"+entry.executor.discriminator+"**.")
	  .setFooter("Channel ID: "+channel.id)
	return logChannel.send(botembed); 
		}
	 }, function(error) { 
   console.log(error);  });	
});
client.on('guildBanAdd',(guild, user) => {
	TheClient.bigDB.loadOrCreate(guilddb, guild.id, async function(db) {
		if(db.banunbanlog == true)
		{
	//  console.log(entry)
	const logChannel = guild.channels.cache.find(val => val.name === db.logchannel);
	if (!guild.me.hasPermission('VIEW_AUDIT_LOG')&& logChannel) {
      return logChannel.send("I need the `View Audit Log` permission for logging events!!");
    }
	const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
	let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setThumbnail(user.displayAvatarURL)	  
	  .setColor("#FF0000")
	  .addField("Log - Member Banned", `${user.tag} was banned by **${entry.executor.username}#${entry.executor.discriminator}**`)
	  .setFooter("User ID: "+user.id)
	  return logChannel.send(botembed);	
	}
   }, function(error) { console.log(error); });
});
function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}
function listmodcommand(mc){
	var lsi = "None.";
	   for (let i = 0; i < mc.length; i++) {
		 if(i == 0){
			 lsi = "`*"+mc[i]+"`";
		 }
		 else{
			 lsi = lsi +"  `*"+mc[i]+"`";
		 }
	  }
	  return lsi;
}
function listarray(mc){
	var lsi = "None.";
	   for (let i = 0; i < mc.length; i++) {
		 if(i == 0){
			 lsi = "`"+mc[i]+"`";
		 }
		 else{
			 lsi = lsi +" ,`"+mc[i]+"`";
		 }
	  }
	  return lsi;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
client.on('guildBanRemove',(guild, user) => {
	TheClient.bigDB.loadOrCreate(guilddb, guild.id, async function(db) {
		if(db.banunbanlog == true)
		{
	const logChannel = guild.channels.cache.find(val => val.name === db.logchannel);
	if (!guild.me.hasPermission('VIEW_AUDIT_LOG')&& logChannel) {
      return logChannel.send("I need the `View Audit Log` permission for logging events!!");
    }
	const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first())
	let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setThumbnail(user.displayAvatarURL)	  
	  .setColor("#00ff00")
	  .addField("Log - Member Unbanned", `${user.tag} was unbanned by **${entry.executor.username}#${entry.executor.discriminator}**`)
	  .setFooter("User ID: "+user.id)
	  return logChannel.send(botembed);	
	}
   }, function(error) { console.log(error); });
});
client.on('guildMemberUpdate',(oMember, nMember) => {
	TheClient.bigDB.loadOrCreate(guilddb, nMember.guild.id, function(db) {
		if(db.rolelog == true)
		{
	const difference = arr_diff(oMember.roles.array(),nMember.roles.array())
	const oml = oMember.roles.array().length;
	const nml = nMember.roles.array().length;
  if(difference !== [])
  {
	  for (var i = 0; i < difference.length; i++) {
      var fixedrole = difference[i].replace("<","");
	  fixedrole = fixedrole.replace(">","").replace("&","").replace("@","");
      let daRole = nMember.guild.roles.get(fixedrole);	  
	  const logChannel = nMember.guild.channels.cache.find(val => val.name === db.logchannel);
	  if(nml>oml)
	  {
      let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setThumbnail(nMember.displayAvatarURL)	  
	  .setColor(getRandomColor())
	  .addField("Log - Role added", `${nMember.user.tag} has received the role **${daRole.name}**.`)
	  .setFooter("User ID: "+nMember.id)
	  return logChannel.send(botembed);
	  }
	  if(oml>nml)
	  {
      let botembed = new Discord.MessageEmbed()
	  .setAuthor(client.user.username, client.user.avatarURL)
	  .setThumbnail(nMember.displayAvatarURL)	  
	  .setColor(getRandomColor())
	  .addField("Log - Role removed", `Role named **${daRole.name}** was removed from ${nMember.user.tag}.`)
	  .setFooter("User ID: "+nMember.id)
	  return logChannel.send(botembed);
	  }
  }
  }
  }
   }, function(error) { console.log(error); });
});
/*client.on("message", async message => {
});*/
client.on("messageDelete", (messageDelete) => {
	if(messageDelete.channel.type === "dm") return;
	if(messageDelete.author.bot) return;
	TheClient.bigDB.loadOrCreate(guilddb, messageDelete.guild.id, function(db) {
		if(db.msgdellog == true){
		 let logChannel = messageDelete.guild.channels.cache.find(val => val.name === db.logchannel);
		 let botembed = new Discord.MessageEmbed()
	     .setAuthor(client.user.username, client.user.avatarURL)
		 .setColor(getRandomColor())
		 .addField("Log - Message Deleted", `The message "${messageDelete.content}" in channel **#${messageDelete.channel.name}** by **${messageDelete.author.tag}** was deleted.`)
		 .setFooter("User ID: "+messageDelete.author.id)
		 return logChannel.send(botembed);
		}
		}, function(error) { console.log(error); });
});
client.on("message", async message => {
	let approved = 0;
	let assigned = 0;
	let isAdmin = false;
	let isMod = false;
	let modcommand = [];
	let prefix = "*";
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(!message.author.bot){
  if(message.channel.type != "dm"){
  if(!message.webhookID){
  function checkAdminMod(){
	  return new Promise(resolve => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
   TheClient.bigDB.loadOrCreate(guilddb, message.guild.id, function(db) {
	   if(!message.member)
	   {
		  // message.member =
		 //  console.log("ID Null Error!!")
		  // console.log(message.member)
		 //  console.log(message)
	   }
	  if(db.serverAdmins.includes(message.author.id)){
		  isAdmin = true;
	  }
	  if(db.serverMods.includes(message.author.id)){
		  isMod = true;
	  }
	  modcommand = db.modcmds;
	  prefix = db.prefix;
	  resolve('done');
	  }, function(error) { console.log(error); });
	    });
  }
  var result = await checkAdminMod();
   if(!isAdmin && !isMod){
	   TheClient.bigDB.loadOrCreate(guilddb, message.guild.id, function(db) {
    for (let i = 0; i < db.filter.length; i++) {
		if (message.content.includes(db.filter[i].toLowerCase())) {
            message.delete();
            return;
        }
	}
	}, function(error) { console.log(error); });
   }
   let xpAdd = Math.floor(Math.random() * 2) + 3;
    TheClient.bigDB.loadOrCreate(maindb, message.author.id, function(db) {
		   if(db.dollars == null)
		   {
			   db.dollars = 500;
		   }
		   if(db.dailydate == null)
		   {
			   db.dailydate = Date.now();
		   }
		   if(db.name == null)
		   {
			   db.name = message.author.tag;
		   }
		   if(db.lastMessage == null)
		   {
			   db.lastMessage = Date.now();
		   }
        db.dollars = db.dollars + xpAdd;
        db.save();		
	}, function(error) { console.log(error); });
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(prefix) !== 0) return;
  if(message.content.trim() === prefix) return;
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
//console.log(message.content.slice(prefix.length).trim())
  let command = args.shift().toLowerCase();
  // Let's go with a few common example commands! Feel free to delete or change those.
	   TheClient.bigDB.loadOrCreate(guilddb, message.guild.id, function(db) {
		      if(!isAdmin){
	             if(db.ignoredChannels.includes(message.channel.id))
				 {
					 message.delete();
					 return;
				 }
                }
		    for (let i = 0; i < db.aliases.length; i++) {
				if(command == db.aliases[i].split(':')[0] && approved == 0)
				{
					var a = message.content.slice(prefix.length).trim().replace(db.aliases[i].split(':')[0],db.aliases[i].split(':')[1])
					args = a.split(/ +/g);
					args = args.slice(1);
					command = db.aliases[i].split(':')[1].split(' ')[0];
                  //  console.log("found"+ approved)
                   // console.log(args)					
                    checkcommand();
                    approved = 1;					
									 
				}
			}
			if(approved == 0){
			approved = 1;
			checkcommand();}
		   }, function(error) { console.log(error); });

   
 async function checkcommand()
  {
	if (!client.commands.has(command)) return;
	 /* if(!isAdmin && !isMod){
	  cooldown.add(message.author.id);
	  setTimeout(() => {
		  cooldown.delete(message.author.id)
	  },cdseconds*1000)
    }*/
	if(client.commands.get(command).botowneronly === true && message.author.id != "490222491231584266") return;
	client.prefix = prefix
	if(!message.guild.me.hasPermission("EMBED_LINKS")){
		return message.channel.send(":x: I need the `Embed Links` permission to execute most of the commands!")
	}
	if (!cooldowns.has(command)) {
		cooldowns.set(command, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command);
	const cooldownAmount = (client.commands.get(command).cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${prefix}${command}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		console.log("Command Used: "+message.content+" By: "+message.author.tag+" ID: "+message.author.id+" Guild ID :"+message.guild.id)
		client.commands.get(command).execute(client,message, args,isAdmin,isMod,modcommand,TheClient);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	return;
	 //  console.log(command)
 
  }
 }
  }
  else{
	  console.log("DM Received.")
	  console.log("From : "+message.author.tag+" ID: "+message.author.id)
	  console.log("Content: "+message.content)
  }
 }
});

client.login(config.token);
           