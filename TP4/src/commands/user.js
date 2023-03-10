const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription(`Sort le nom de l'utilisateur de la commande et sa date d'arrivée sur le serveur`)
        .addStringOption(option =>
            option.setName('user')
                .setDescription('Le nom du man stp')
                .setRequired(true)),
            
    async execute(interaction) {
        const input = interaction.options.getString("user")
        await interaction.reply(`Le man ${input} est arrivé sur le serveur le ${interaction.member.joinedAt}`)
    },
}
