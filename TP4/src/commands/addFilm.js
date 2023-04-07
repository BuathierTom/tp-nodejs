const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
        

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add_film')
        .setDescription('Ajoute un film')
        .addStringOption(option =>
            option.setName('search')
                .setDescription('Le nom du film')
                .setRequired(true)),
        
    
    async execute(interaction) {
        const search = interaction.options.getString('search');

        const { data } = await axios.post('http://localhost:3000/films/addFilm', {
            "search": search
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
            .setTitle('addFilm')
            .setURL('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Emoji_u1f44d.svg/1200px-Emoji_u1f44d.svg.png')  
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(`Le film **${search}** a été ajouté avec succès !`)
            .setTimestamp()

        await interaction.reply({ embeds: [winEmbed] });
    },
};