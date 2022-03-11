const { SlashCommandBuilder } = require('@discordjs/builders');
const vrchat = require("vrchat");

const { user } = require('config.json');
const configuration = new vrchat.Configuration(user);
const AuthenticationApi = new vrchat.AuthenticationApi(configuration);
const FriendsApi = new vrchat.FriendsApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
	.setName('vrc_world_online')
	.setDescription('접속중인 VRChat 인원수를 조회합니다.'),
	async execute(interaction) {
		AuthenticationApi.getCurrentUser().then(resp => {
			FriendsApi.getFriends().then(async resp =>{
				let result = `온라인 유저: ${resp.data.length}\n`;
				resp.data.forEach(x=> result += `${x.displayName}\n`)
				
				await interaction.reply(result);
			});
		});
	},
};