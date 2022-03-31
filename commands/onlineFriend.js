const {SlashCommandBuilder} = require('@discordjs/builders')
const vrchat = require('vrchat')
const UserData = require('../Data/UserData.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('online_friend')
	.setDescription('접속중인 친구 인원수를 조회합니다.'),
	async execute(interaction) {
		const DiscordUserId = interaction.user.id
		const FindUserData = await UserData.findOne()

		if(FindUserData.Discored_id === DiscordUserId) {
			const FindUserData = await UserData.findOne()
			const IK = FindUserData.VRChat_ID
			const PK = FindUserData.VRChat_PW
			
			
			const configuration = new vrchat.Configuration({
				username: IK,
				password: PK
			})
			console.log(IK)
			console.log(PK)
			
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