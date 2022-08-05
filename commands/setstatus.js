module.exports = {
    name: 'setstatus',
	cooldown: 0.1,
	botowneronly:true,
    description: 'Sets the status of the bot. Bot owner only.',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        if(!message.author.id === "490222491231584266"){
	 
    return;
    
    }
	
    client.user.setActivity(args.join(" "));
	
    return message.channel.send("Status has been set to `"+args.join(" ")+"`.");
    },
};