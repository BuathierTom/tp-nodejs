const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Zwiiiiiiiip!')
        .addStringOption(option => option.setName('term').setDescription('The term to search')),
    async execute(interaction) {
        const term = interaction.options.getString('term');
        const urbanResult = await request(`https://api.urbandictionary.com/v0/define?term=${term}`);
        const { list } = await urbanResult.body.json();

        await interaction.reply({ content: list[0].definition });
    },
};