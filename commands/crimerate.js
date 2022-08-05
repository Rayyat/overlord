const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'crimerate',
    description: 'Shows crime coefficient of an user.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
  let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  var tag;
  if (!user) {
    user = message.author;
	 tag =  message.author.tag
  }
  else{
	  tag = user.user.tag
  }
  var av = user.avatarURL
  let userHash = 0;
  for (let i = 0; i < tag.length; i++) {
    userHash += parseInt(tag[i].charCodeAt(0));
  }
  let crimeCoefficient = Math.round(parseFloat(`0.${String(userHash)}`) * 500) + 1;
  let crimeStat;
  if (crimeCoefficient < 100) {
    crimeStat = 'Suspect is not a target for enforcement action. The trigger of Dominator will be locked.';
  }
  else if (crimeCoefficient < 300) {
    crimeStat = 'Suspect is classified as a latent criminal and is a target for enforcement action. Dominator is set to Non-Lethal Paralyzer mode. Suspect can then be knocked out using the Dominator.';
  }
  else {
    crimeStat = 'Suspect poses a serious threat to the society. Lethal force is authorized. Dominator will automatically switch to Lethal Eliminator. Suspect that is hit by Lethal Eliminator will bloat and explode.';
  }
   let botembed = new Discord.MessageEmbed()
   .setColor(mod.getRandomColor())
   .setAuthor(tag, av)
   .setFooter("Requested by "+ message.author.tag)
   .addField(`Crime Coefficient of ${tag} is ${crimeCoefficient}`, crimeStat,true)
   .setTimestamp()
   return message.channel.send(botembed);
    },
};