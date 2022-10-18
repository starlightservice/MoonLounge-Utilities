module.exports = {
    name: "announce",
    aliases: ["anc"],
    description: "Creates a announcement",
    usage: 'm!announce <channel> <Announcement>',
    cooldown: 1,
    UserPerms: ["MANAGE_GUILD"],

    async execute(client, message, cmd, args, Discord) {

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])

        if (!channel) return message.reply("Please provide a channel where you wanna send the announcement!")

        const anc = args.slice(1).join(" ")

        if (!anc) return message.reply("Please provide what to announce!")

        let mention

        if (args.some((val) => val.toLowerCase() === "-ping")) {

            for (let i = 0; i < args.length; i++) {

                if (args[i].toLowerCase() === '-ping') args.splice(i, 1)

            }

            mention = true

        } else mention = false

        if (mention === true) channel.send('@everyone')

        const image = message.attachments.first() ? message.attachments.first().proxyURL : null

        const ancEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle("NEW ANNOUNCEMENT")
            .setDescription(args.slice(1).join(" "))
            .setImage(image)
            .setTimestamp()
            .setFooter("Announcement by MoonLounge Utilities")

        channel.send({ embeds: [ancEmbed] }).then((msg) => {

            msg.react("⬆")
            msg.react("⬇")

            message.delete().catch(err => {

                if (err.code !== 10008) return console.log(err)

            })

        }).catch(err => {
            throw err
        })

    }
}