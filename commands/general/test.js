module.exports = {
    name:"test",
    description:"Test command",
    aliases: ["test2"],
    execute(message, args) {
        message.channel.send("Test command!");
    }
}