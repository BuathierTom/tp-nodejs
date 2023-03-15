const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription(`commande avec sous-commande 'user' et 'server'`)
        .addStringOption(option =>
            option.setName('user')
                .setDescription('Le nom du man stp')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('server')
                .setDescription('Le nom du server stp')
                .setRequired(true)),
            
    async execute(interaction) {
        // On fais une boucle pour parcourir les options
        for (const option of interaction.options.data) {

            // On vérifie si l'option est 'user'
            if (option.name === 'user') {
                const serverInfoEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Server Info')
                .setDescription(`Name: ${message.guild.name}\nID: ${message.guild.id}\nRegion: ${message.guild.region}\nMembers: ${message.guild.memberCount}`)
                message.channel.send(serverInfoEmbed);
            }
            // On vérifie si l'option est 'server'
            if (option.name === 'server') {
                let user;
                if (message.mentions.users.first()) {
                user = message.mentions.users.first();
                } else {
                user = message.author;
                }
                const userInfoEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('User Info')
                .setDescription(`Username: ${user.username}\nID: ${user.id}\nCreated at: ${user.createdAt}`)
                message.channel.send(userInfoEmbed);
            }
                    

        
        
        }

    },
}
