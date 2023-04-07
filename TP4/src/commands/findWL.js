const axios = require('axios');
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
            return await interaction.reply(resp.data.Error);
        }

        const cursor = resp.data;
        let result = "";
        await cursor.forEach((item) => {
            result += '```\n'
            result += `_id: ${item._id}\n`
            result += `id: ${item.id}\n`
            result += `id_user: ${item.id_user}\n`
            result += `nom_WL: ${item.nom_WL}\n`
            result += `favoris: ${item.favoris}\n`
            result += `liste_films: \n`
            result += `--------------------------------------------------------------\n`
            // Pour tous les elements de la liste de films : 
            item.ListeFilms.forEach((film) => {
                result += `    - ${film.id_film}\n`
                result += `    - ${film.statut}\n`
                result += `    - ${film.note}\n`
                result += `--------------------------------------------------------------\n`
            });
            result += '```\n'

        });
        await interaction.reply(result);
    },
};