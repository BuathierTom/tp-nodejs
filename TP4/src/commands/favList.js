const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
        

module.exports = {
    data: new SlashCommandBuilder()
        .setName('favoris_list_wl')
        .setDescription('Liste de toutes les watchlists mises en favoris d un utilisateur')
        .addStringOption(option =>
            option.setName('pseudo')
                .setDescription('Le pseudo de l utilisateur')
                .setRequired(true)),

    async execute(interaction) {
        const pseudo = interaction.options.getString('pseudo');

        const resp = await axios.get('http://localhost:3000/watchlists/favList', {
            data: {
                pseudo: pseudo
            }
        });


        const cursor = resp.data;
        let result = "";
        await cursor.forEach((item)=>{
            result += `**_id:** ${item._id}\n`
            result += `**id:** ${item.id}\n`
            result += `**id_user:** ${item.id_user}\n`
            result += `**nom_WL:** ${item.nom_WL}\n`
            result += `**favoris:** ${item.favoris}\n`
        
            // Pour tous les elements de la liste de films : 
            item.ListeFilms.forEach((film) => {
                result += `**ListeFilms:** \n`
                result += `-------------------------------------------------------------\n`
                // Les ‎ sont des caractères invisibles qui permetten de faire de l'indentation dans le embed
                result += `‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎ - **id_film:** ${film.id_film}\n`
                result += `‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎ - **statut:** ${film.statut}\n`
                result += `‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎ - **note:** ${film.note}\n`
                result += `-------------------------------------------------------------\n`
            });

            result += `\n`

        });


        const winEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('FavorisList')
            .setURL('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Emoji_u1f44d.svg/1200px-Emoji_u1f44d.svg.png')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(result)
            .setTimestamp()
        await interaction.reply({ embeds: [winEmbed] });
    },
};