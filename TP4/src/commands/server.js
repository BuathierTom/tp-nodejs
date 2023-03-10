const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Sort le nom du serveur et son nombre de membres'),
    async execute(interaction) {
        await interaction.reply("Le nom du serveur est : **" 
                                + interaction.guild.name 
                                + "** et le nombre de membres est de : **" 
                                + interaction.guild.memberCount 
                                + "**")
    },
}
