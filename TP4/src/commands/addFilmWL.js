const axios  = require('axios');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addfilm_wl')
        .setDescription('Ajoute un film a une watchlist')
        .addStringOption(option =>
            option.setName('pseudo')
                .setDescription('Le pseudo de l utilisateur')
                .setRequired(true))
                
        .addStringOption(option =>
            option.setName('nom_wl')
                .setDescription('Le nom de la watchlist')
                .setRequired(true))
        
        .addStringOption(option =>
            option.setName('titre')
                .setDescription('Le titre du film')
                .setRequired(true))
        
        .addStringOption(option =>
            option.setName('statut')
                .setDescription('Le statut du film (A mettre : A voir, En cours, Terminé, Abandonné)')
                .setRequired(true))
        
        .addStringOption(option =>
            option.setName('note')
                .setDescription('La note du film (Entre 0 et 20 sinon N/A)')
                .setRequired(true)),

    async execute(interaction) {

        const pseudo = interaction.options.getString('pseudo');
        const nom_WL = interaction.options.getString('nom_wl');
        const titre = interaction.options.getString('titre');
        const statut = interaction.options.getString('statut');
        const note = interaction.options.getString('note');


        const { data } = await axios.post('http://localhost:3000/watchlists/addFilmWL', {
            "pseudo": pseudo,
            "nom_WL": nom_WL,
            "titre": titre,
            "statut": statut,
            "note": note
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
            .setDescription(`Ajout du film **${titre}** a la watchlist **${nom_WL}** avec une note de **${note}** et un statut de **${statut}** avec succès! `)
            .setTimestamp()

        await interaction.reply({ embeds: [winEmbed] });
    },
};
