const Discord = require("discord.js");
var mod = require("../utils/rndcolor");
module.exports = {
    name: 'fliptext',
    description: 'Flips the given text.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
      const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
      const OFFSET = '!'.charCodeAt(0);
	  if(!args[0]){
		  return client.emit("cmderr",message,"You must give a text to flip!!");
	}
	 var sentth = args.slice(0).join(' ').split('').map(c => c.charCodeAt(0) - OFFSET).map(c => mapping[c] || ' ').reverse().join('')
	 return client.emit("success",message,"**Flipped text:** "+sentth);
    },
};