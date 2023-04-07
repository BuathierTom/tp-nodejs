const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
        

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userlist')
        .setDescription('Liste de tout les utilisateurs'),
    async execute(interaction) {
        const resp = await axios.get('http://localhost:3000/users/userList');
        const cursor = resp.data;
        let result = "";
        await cursor.forEach((item)=>{
            result += `**User:** ${item.pseudo}\n`
            result += `**ID:** ${item.id}\n`
            result += `**Age:** ${item.age}\n`
            result += ` \n`
        });

        const winEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('userlist')
            .setURL('https://github.com/BuathierTom/TP_NODES')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(result)
            .setTimestamp()
        await interaction.reply({ embeds: [winEmbed] });
    },
};