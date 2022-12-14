const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'reload',
	botowneronly:true,
	cooldown: 0.1,
    description: 'Reloads commands.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
  if(!message.author.id === "352128199112785921") return;
  if(!args || args.size < 1) return message.reply("You have to provide a command to reload.");
  const commandName = args[0]; //args.join(" ") ?
  // Check if the command exists and is valid
  if(!client.commands.has(commandName)) {
    return message.reply("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  return message.channel.send("The command `"+commandName+"` has been reloaded.");
    },
};