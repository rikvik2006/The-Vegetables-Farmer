const Discord = require('discord.js');

module.exports = {
    name: "website",
    description: "Get the website link",
    aliases: ["site"],
    execute (message, args) {
        const website_embed = new Discord.MessageEmbed()
            .setColor('#8D8D8D')
            .setTitle('Website')
            .setDescription('If we hed a website, it would be here')

        message.reply({embeds: [website_embed], ephmeral: true});
    }
}