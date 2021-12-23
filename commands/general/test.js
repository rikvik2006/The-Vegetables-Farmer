module.exports = {
    name:"test",
    description:"Test command",
    aliases: ["test2"],
    onlyStaff: true,
    execute(message, args) {
        message.channel.send("Test command!");
    }
}