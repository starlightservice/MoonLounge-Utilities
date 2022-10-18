const { Util } = require("discord.js")
const Schema = require("../../models/verification-roles")

module.exports = {
    name: "verification-add",
    description: "Adds a role for verification system.",
    aliases: ["vadd"],
    usage: "b!vadd <role> <emoji>",
    BotPerms: ["ADD_REACTIONS"],
    UserPerms: ["ADMINISTRATOR"],

    async execute(client, message, cmd, args, Discord) {

        if (!args[0]) return message.reply("Please mention a verification role first!")

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

        if (!role) return message.reply("The role you provided is not valid in this server!")

        let [, emoji] = args

        if (!emoji) return message.reply("Please mention an emoji for verifying user first!")

        const parsedEmoji = Util.parseEmoji(emoji)

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (data) {

                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: message.guild.id }, data)

            } else {

                new Schema({

                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {

                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji
                            }
                        ]

                    }

                }).save()

            }

            message.reply("Verification role has be added.")

        })

    }
}