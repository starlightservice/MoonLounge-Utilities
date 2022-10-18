const Schema = require("../../models/verification-roles")

module.exports = {
    name: "verification-clear",
    description: "Clears the verification Roles",
    aliases: ["vclear"],
    usage: "b!vclear",
    UserPerms: ["ADMINISTRATOR"],

    async execute(client, message, cmd, args, Discord) {

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (data) {

                await data.delete()

                message.reply("Data from the verification panel has been cleared!")

            } else {

                message.reply("There's no data in the verification panel!")

            }

        })

    }
}