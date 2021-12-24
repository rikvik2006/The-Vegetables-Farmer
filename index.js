const Discord = require('discord.js');
global.client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"] });
require('dotenv').config()

client.login(process.env.TOKEN);


//*  Richiedo al diperndenza fs 
// I require FS dependency 

const fs = require('fs');

//** Creo una collection */
// I create a collection
client.commands = new Discord.Collection();

//** Creo una collezione di comandi solo nella cartella /commands*/
// I create a collection of commands only in the /commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//** Per ogni file, eseguo il require */
// For each file, I execute the require
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/** Creo una collezione di comandi per tutte le cartelle di commands*/
// I create a collection of commands for all the commands folders
const commandsFolder = fs.readdirSync('./commands')
for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        //** Aggiungo il comando alla collezione */
        // I add the command to the collection
        client.commands.set(command.name, command);
    }
}


//** Eventi */
// Events
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

//** Per ogni file eseguo il require */
// For each file, I execute the require
for (const file of events) {
    const event = require(`./events/${file}`);
    //** Prendo tutti i parametri dell evento e li passo nell execute */
    // I get all the parameters of the event and pass them in the execute
    client.on(event.name, (...args) => event.execute(client, ...args));
}

//** Eseguo il comando */
// I run the command
client.on('messageCreate', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    //** Prendo il comando */
    // I get the command1
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //** Controllo il nome del comando e i suoi alias */
    // I check the command name and its aliases
    if (!client.commands.has(commandName) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)))return;

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command.onlyStaff) {
        if (!message.member.roles.cache.find(r => r.name === "Red Lettuce") || !message.member.roles.cache.find(r => r.name === "Avocado (MOD)")) {
            return message.channel.send(`You don't have the permission to use this command!`);
        }
    }

    //** Controllo se il comando è satato inviato nei DM  */
    // I check if the command is sent in DM
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    //** Controllo se il comando è stato inviato in un canale di supporto */
    // I check if the command is sent in a support channel
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});


