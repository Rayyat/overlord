const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'destruct',
    description: 'Creates self-destructing messages.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
 if(!args[0]||!args[1]||!args[2])
		  return client.emit("cmderr",message,"Error parsing command, Missing arguments. The correct format is : `*destruct [delay(milliseconds)] [type(string/embed/,inline)] [message]`"); 
	  let message69 = args.slice(2).join(' ');
    let delay = isNaN(args[0]) ? 5000 : parseInt(args[0]);
    delay = (delay < 100) ? 100 : delay;
	delay = (delay > 5000) ? 5000 : delay;
    const style = (typeof args[1] === 'string') ? args[1] : 'plain';

    message.delete();

    switch (style) {
    case 'embed':
	var a = message69;
	message69 = new Discord.MessageEmbed()
	.setColor(mod.getRandomColor())
	.setFooter("Secret Message")
	.addField(`This message self-destructs in ${delay / 1000} seconds.`,a,true)       
        break;
    case 'inline':
        message69 = `*This message self-destructs in ${delay / 1000} seconds.*\n${message69}`;
        break;
    case 'code':
        message69 = `*This message self-destructs in ${delay / 1000} seconds.*\n\`\`\`${message69}\`\`\``;
        break;
    }

    (await message.channel.send(message69)).delete(delay);
    },
};