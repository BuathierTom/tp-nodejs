const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription(`Prend un input en option et le renvoi à l'utilisateur`)
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Tranquilleeeee')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString("input")
        await interaction.reply(input)
    }
}