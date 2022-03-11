const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Message } = require('discord.js');
const fs = require('fs');
module.exports = {
	data: new SlashCommandBuilder()
	.setName('user_favorites')
	.setDescription('userfavorites')
    .addStringOption(option => 
        option.setName('vrcname')
            .setDescription('VRChat 닉네임을 입력합니다.')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('username')
            .setDescription('유저 고유 아이디를 입력합니다.(무제한)')
            .setRequired(true)
    ),
	async execute(interaction) {

        const DiscordUserId = interaction.user.id
        const DiscordUserTag = interaction.user.tag
        const FavoritesUserTag = interaction.options.getString('vrcname')
        const SetVRChatUserName = interaction.options.getString('username')

        const filePath = `./Data/FavoritesUser.json`
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify([])) : null;
        const UserData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
        UserData.push({ DiscordUserId, DiscordUserTag, FavoritesUserTag, SetVRChatUserName });

        fs.writeFileSync(filePath, JSON.stringify(UserData, null, 2));
	}
};