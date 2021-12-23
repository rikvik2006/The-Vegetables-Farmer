const Discord = require('discord.js');
global.client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"] });
require('dotenv').config()

client.login(process.env.TOKEN);

client.on ('ready', () => {
    console.log('Bot is online!');
});


//*  Richiedo al diperndenza fs */
const fs = require('fs');

//** Creo una collecrion */
client.commands = new Discord.Collection();

//** Creo una collezione di comandi solo nella cartella /commands*/
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//** Per ogni file, eseguo il require */
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/** Creo una collezione di comandi per tutte le cartelle di commands*/
const commandsFolder = fs.readdirSync('./commands')
for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        //** Aggiungo il comando alla collezione */
        client.commands.set(command.name, command);
    }
}

//** Eseguo il comando */
client.on('messageCreate', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    //** Prendo il comando */
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //** Controllo il nome del comando e i suoi alias */
    if (!client.commands.has(commandName) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)))return;

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //** Controllo se il comando è satato inviato nei DM  */
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    //** Controllo se il comando è stato inviato in un canale di supporto */
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});