const axios  = require('axios');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find_film_wl')
        .setDescription('Affiche les films d une watchlist')
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

        const resp = await axios.get('http://localhost:3000/watchlists/findFilmWL', {
            data: {
                "pseudo": pseudo,
                "nom_WL": nom_WL,
            }
        });

        // on affiche sans embed
        // await interaction.reply(resp.data);

        // Foreach dans la liste des films pour afficher les infos
        const cursor = resp.data;
        let result = "";
        await cursor.forEach((item)=>{
            result += `**id_film:** ${item.id_film}\n`
            result += `**statut:** ${item.statut}\n`
            result += `**note:** ${item.note}\n`
        
            result += `\n`
        
        });

        const winEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('findFilmWL')
            .setURL('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Emoji_u1f44d.svg/1200px-Emoji_u1f44d.svg.png')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(result)
            .setTimestamp()

        await interaction.reply({ embeds: [winEmbed] });
    },
};
