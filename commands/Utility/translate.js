const translate = require("@iamtraction/google-translate")

module.exports = {
    name: 'translate',
    description: "Translates any text into English",
    usage: "m!translate <text>",

    async execute(client, message, cmd, args, Discord) {

        const query = args.join(" ")

        if (!query) return message.reply("Please provide a text to translate!")

        const translated = await translate(query, { to: 'en' })

        const transEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .addField("Raw", "```" + query + "```")
            .addField("Translated", "```" + translated.text + "```")
            .setFooter("Translated by MoonLounge Utilities")
            .setTimestamp()

        message.reply({ embeds: [transEmbed] })

    }
}