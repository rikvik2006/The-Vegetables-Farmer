const Discord = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    description: 'Create a new interaction',
    async execute(interaction, args) {


        if (!interaction.isCommand()) return;
                        //^^^^^^^


        const { commandName } = interaction;

        if (commandName === "join") {
            await interaction.reply("You have entered in the cave, Congratulation!");
        } else if (commandName === "leave") {
            await interaction.reply("You have left the cave, Bye!");
        } else if (commandName === "help") {
            await interaction.reply({ embeds: [help_embed] });
            const help_embed = new Discord.MessageEmbed()
                .setTitle("Help")
                .setDescription("This is the help command")
                .setColor("#0099ff")
                .addField("Slash Commands", "Now you can also use slash commands, \npress `/` to view a complete list of commands")
                .addField("Join", "Join the cave press `/join`")
        } else if (commandName === "website") {
            await interaction.reply({ embeds: [website_embed], ephmeral: true })
            const website_embed = new Discord.MessageEmbed()
                .setColor('#8D8D8D')
                .setTitle('Website')
                .setDescription('If we hed a website, it would be here')

                ;
        }

    }
}