const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'ready',
    execute() {
        console.log('Bot is online!');

        // Set the bot's status
        client.user.setActivity('we have no funds, yes this doodles is a screanshot LOL', { type: 'WATCHING' });

        // Price etereum in EUR 

        // setInterval(async function() {
        //     var channel = client.channels.cache.get('923557234351419402')
        //     await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur")
        //         .then(res => res.json())
        //         .then(data => console.log(data));
        // }, 1000 * 5);
    } 
}