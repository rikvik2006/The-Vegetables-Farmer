module.exports = {
    name:"ping",
    description:"Test command",
    aliases: ["test"],
    onlyStaff: true,
    execute(message, args) {
        message.channel.send("Pong!");
    }
}