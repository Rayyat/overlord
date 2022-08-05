module.exports = {
    name: 'ping',
    description: 'Ping!',
    async execute(client,message, args,isAdmin,isMod,modcommand,TheClient) {
        const m = await message.channel.send("Ping?");
    
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    },
};