module.exports = {
    name: 'interactionCreate',
    description: 'Create a new interaction',
    async execute(interaction, args) {

        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === "join") {
            await interaction.reply("You have entered in the cave, Congratulation!");
        }

    }

}