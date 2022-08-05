const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'info',
    description: 'Shows information about the bot.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.MessageEmbed()
	.setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Bot Information")
    .setColor(mod.getRandomColor())
    .setThumbnail(bicon)
	.setTimestamp()
    .addField("Bot Name", client.user.username,true);
     botembed.addField("Bot Owner", "Rayyat#5990",true);
	botembed.addField("Version", "1.1",true);
	botembed.addField("discord.js", "v12",true);
    return message.channel.send(botembed);
    },
};