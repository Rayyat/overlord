const Discord = require("discord.js");
module.exports = {
    name: 'color',
    description: 'Shows information about the given color.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
         const rgbToHSL = (red, green, blue) => {
    let r = red / 255;
    let g = green / 255;
    let b = blue / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { hue: h, saturation: s, lightness: l };
};

const resolveColor = input => {
    if (input.startsWith('#')) input = input.substr(1);
    if (input.length === 3) input = input.split('').map(c => c + c).join('');

    let hex = input;
    let [red, green, blue] = [hex.substr(0, 2), hex.substr(2, 2), hex.substr(4, 2)]
        .map(value => parseInt(value, 16));
    let { hue, saturation, lightness } = rgbToHSL(red, green, blue);

    return { hex, red, green, blue, hue, saturation, lightness };
};
    if (args.length < 1) {
        return client.emit("cmderr",message,'Please provide a color!');
    }

    if (!/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(args[0])) {
        return client.emit("cmderr",message,'The color must be in the format of `#RRGGBB` or `#RGB`!');
    }

    let color = resolveColor(args[0]);
	let botembed = new Discord.MessageEmbed()
	.setAuthor(client.user.username, client.user.avatarURL)
	.addField("Color Information",`Hex: \`#${color.hex}\`\nRGB: \`${color.red}, ${color.green}, ${color.blue}\`\nHSL: \`${color.hue}, ${color.saturation}, ${color.lightness}\``)
    .setThumbnail(`http://placehold.it/500/${color.hex}/${color.hex}`)
    .setColor(`${color.hex}`)
	.setTimestamp()
	return message.channel.send(botembed);
    },
};