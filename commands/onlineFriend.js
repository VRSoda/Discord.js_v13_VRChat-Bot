const { SlashCommandBuilder } = require('@discordjs/builders');
const vrchat = require("vrchat");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('online_friend')
	.setDescription('접속중인 친구 인원수를 조회합니다.'),
	async execute(interaction) {
		const filePath = `./Data/UserData.json`
		const UserData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

		const DiscordUserId = interaction.user.id
		const StringDUI = DiscordUserId.toString();

		let DI_TAMP = UserData.find(index => index.DiscordUserId === StringDUI)
		if(!DI_TAMP) {
			//아이디가 저장된게 없음!!!
			await interaction.reply("계정 등록이 안되었습니다. 계정 등록을 진행하세요.");
			return ;
		}

		const {DiscordUserId:DI} = DI_TAMP;
		if(DI === StringDUI) {
			const { VRC_Id:IK, VRC_Password:PK } = UserData.find(index => index.DiscordUserId === DiscordUserId)
			const configuration = new vrchat.Configuration({
				username: (IK),
				password: (PK)
			})
			
			const AuthenticationApi = new vrchat.AuthenticationApi(configuration)
			const FriendsApi = new vrchat.FriendsApi(configuration);
			
			AuthenticationApi.getCurrentUser().then(resp => {
				FriendsApi.getFriends().then(async resp =>{
					let result = `온라인 유저: ${resp.data.length}\n`;
					//( 숨김) 친구 목록 전체 표시 기능
					resp.data.forEach(x=> result += `${x.displayName}\n`)
					await interaction.reply(result);
				})
			}).catch(async error => await interaction.reply("아이디 또는 비밀번호가 틀립니다"));
		}
	},
};