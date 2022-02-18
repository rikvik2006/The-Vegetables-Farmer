
const axios = require('axios');

module.exports = {
    name: 'ready',
    execute() {
        console.log('✅｜Bot is online!');

        // Set the bot's status
        client.user.setActivity('we have no funds, yes this doodles is a screanshot LOL', { type: 'WATCHING' });



        /******************** */
        //    slach comands   //
        /*********************/


        client.guilds.cache.forEach(guild => {
            guild.commands.create({
                name: "ping",
                description: "Comando di test",
                options: [
                    {
                        name: 'test',
                        description: 'test test',
                        type: 'string',
                    }
                ]
            })
        })
    }
}