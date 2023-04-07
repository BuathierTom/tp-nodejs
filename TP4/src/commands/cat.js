const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get a random cat picture!'),
    async execute(interaction) {
        const catResult = await request('https://aws.random.cat/meow');
        const { file } = await catResult.body.json();

        await interaction.reply({ files: [file] });
    },
};


