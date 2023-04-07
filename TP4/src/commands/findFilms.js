const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find_films')
        .setDescription('Liste de tout les films'),
        

    async execute(interaction) {
        const resp = await axios.get('http://localhost:3000/films/findFilms');
        const cursor = resp.data;
        let result = "";
        await cursor.forEach((item)=>{
            result += `**ID:** ${item.id}\n`
            result += `**Titre:** ${item.Title}\n`
            result += `**Date de sortie:** ${item.Released}\n`
            result += `**Genre:** ${item.Genre}\n`
            result += `**Durée:** ${item.Runtime}\n`
            result += `**Réalisateur:** ${item.Writer}\n`
            result += `**Acteurs:** ${item.Actors}\n`
            result += `**Type:** ${item.Type}\n`
            result += `**Synopsis:** ${item.Plot}\n`
            result += ` \n`



        } );

        // Pour chaque film, on créé un embed avec les informations du film

        

        const winEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('find_films')
            .setURL('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Emoji_u1f44d.svg/1200px-Emoji_u1f44d.svg.png')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(result)
            .setTimestamp()
        await interaction.reply({ embeds: [winEmbed] });

    },
};


