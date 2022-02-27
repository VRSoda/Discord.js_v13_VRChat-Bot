const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!'),
	async execute(interaction) {
		await interaction.reply(`서버 이름: ${interaction.guild.name}\n서버 인원: ${interaction.guild.memberCount}명`);
	},
};