const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
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
            .setTitle('createUser')
            .setURL('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Emoji_u1f44d.svg/1200px-Emoji_u1f44d.svg.png')
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(`L'utilisateur **${pseudo}** a été créé avec succès !`)
            .setTimestamp()

        await interaction.reply({ embeds: [winEmbed] });
    },
};
