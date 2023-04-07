const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
        

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_user')
        .setDescription('Créé un utilisateur')
        .addStringOption(option =>
            option.setName('pseudo')
                .setDescription('le pseudo de l utilisateur')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('age')
                .setDescription('L age de l utilisateur')
                .setRequired(true)),
    

    async execute(interaction) {
        const pseudo = interaction.options.getString('pseudo');
        const age = interaction.options.getString('age');

        const { data } = await axios.post('http://localhost:3000/users/createUser', {
            "pseudo": pseudo,
            "age": age
        });

        if (data.Error) {
            return await interaction.reply(data.Error);
        }

        await interaction.reply(`L'utilisateur ${pseudo} a été créé avec succès !`);
    },
};
