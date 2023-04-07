const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

const {
    SlashCommandBuilder
} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('find_watchlist')
        .setDescription('Liste de toute les watchlist des utilisateurs')
        .addStringOption(option =>
            option.setName('pseudo')
            .setDescription('le pseudo de l utilisateur')
            .setRequired(true)),

    async execute(interaction) {
        const pseudo = interaction.options.getString('pseudo');

        const resp = await axios.get('http://localhost:3000/users/findWL', {
            data: {
                pseudo: pseudo
            }
        });

        if (resp.data.Error) {
            const errorEmbed = new EmbedBuilder()
            .setColor(0xf10909)
            .setTitle('ERROR')
            .setURL('https://github.com/BuathierTom/TP_NODES')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(resp.data.Error)
            .setTimestamp()

            return await interaction.reply({ embeds: [errorEmbed] });
        }

        const cursor = resp.data;

        let result = "";
        await cursor.forEach((item) => {
            result += `**_id:** ${item._id}\n`
            result += `**id:** ${item.id}\n`
            result += `**id_user:** ${item.id_user}\n`
            result += `**nom_WL:** ${item.nom_WL}\n`
            result += `**favoris:** ${item.favoris}\n`
            result += `**ListeFilms:** \n`
            result += `-------------------------------------------------------------\n`
            // Pour tous les elements de la liste de films : 
            item.ListeFilms.forEach((film) => {
                // Les ‎ sont des caractères invisibles qui permetten de faire de l'indentation dans le embed
                result += `‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎ - **id_film:** ${film.id_film}\n`
                result += `‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎ - **statut:** ${film.statut}\n`
                result += `‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎ - **note:** ${film.note}\n`
                result += `-------------------------------------------------------------\n`
            });

        });
        const winEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('find_WatchList')
            .setURL('https://github.com/BuathierTom/TP_NODES')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(result)
            .setTimestamp()
        await interaction.reply({ embeds: [winEmbed] });
    },
};