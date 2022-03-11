const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('유저 태그와 아이디를 확인 합니다.'),
	async execute(interaction) {
		await interaction.reply(`유저 태그: ${interaction.user.tag}\n유저 아이디: ${interaction.user.id}`);
	},
};