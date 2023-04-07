const { axios } = require('axios');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_wl')
        .setDescription('Créé une watchlist')
        .addStringOption(option =>
            option.setName('pseudo')
                .setDescription('Le pseudo de l utilisateur')
                .setRequired(true))
                
        .addStringOption(option =>
            option.setName('nom_wl')
                .setDescription('Le nom de la watchlist')
                .setRequired(true)),

    async execute(interaction) {

        const pseudo = interaction.options.getString('pseudo');
        const nom_WL = interaction.options.getString('nom_wl');

        const { data } = await axios.post('http://localhost:3000/watchlists/createWL', {
            "pseudo": pseudo,
            "nom_WL": nom_WL
        });

        if (data.Error) {
            const errorEmbed = new EmbedBuilder()
            .setColor(0xf10909)
            .setTitle('ERROR')
            .setURL('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Antu_dialog-error.svg/1200px-Antu_dialog-error.svg.png')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(data.Error)
            .setTimestamp()

            return await interaction.reply({ embeds: [errorEmbed] });
        }
        const winEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('createWL')
            .setURL('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Emoji_u1f44d.svg/1200px-Emoji_u1f44d.svg.png')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(`La watchlist **${nomWL}** a été créé avec succès !`)
            .setTimestamp()

        await interaction.reply({ embeds: [winEmbed] });
    },
};
