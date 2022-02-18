global.Discord = require('discord.js');
global.client = new Discord.Client({ 
    intents: 32767,
    partiala: ["MESSAGE", "CHANNEL", "REACTION"] 
});


require('dotenv').config()

client.login(process.env.TOKEN);


//*  Richiedo al diperndenza fs 
// I require FS dependency 

const fs = require('fs');
const { CLIENT_RENEG_LIMIT } = require('tls');

//** Creo una collection */
// I create a collection
client.commands = new Discord.Collection();

//** Creo una collezione di comandi solo nella cartella /commands*/
// I create a collection of commands only in the /commands folder
const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`);
    for (const file of commandsFiles) {
        if (file.endsWith(".js")) {
            const command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
        else {
            const commandsFiles2 = fs.readdirSync(`./commands/${folder}/${file}`)
            for (const file2 of commandsFiles2) {
                const command = require(`./commands/${folder}/${file}/${file2}`);
                client.commands.set(command.name, command);
            }
        }
    }
}






//** Eventi */
// Events
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`)

    for (const file of eventsFiles) {
        if (file.endsWith(".js")) {
            const event = require(`./events/${folder}/${file}`);
            client.on(event.name, (...args) => event.execute(...args));
        }
        else {
            const eventsFiles2 = fs.readdirSync(`./events/${folder}/${file}`)
            for (const file2 of eventsFiles2) {
                const event = require(`./events/${folder}/${file}/${file2}`);
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

//**Funzioni */
//Funnctions
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
for (const file of functionFiles) {
    require(`./functions/${file}`);
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
    if (!client.commands.has(commandName) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))) {
        return message.reply({ content: "Command not found", ephemeral: true });
    }
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command.onlyStaff) {
        if (!message.member.roles.cache.find(r => r.id === "923527745085005824") && !message.member.roles.cache.find(r => r.id === "923534959468249160")) {
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
