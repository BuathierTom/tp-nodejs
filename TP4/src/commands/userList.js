const axios = require('axios');
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
            result += '```\n'
            result += `User: ${item.pseudo}\n`
            result += `ID: ${item.id}\n`
            result += `Age: ${item.age}\n`
            result += '```\n'
        });
        await interaction.reply(result);
    },
};