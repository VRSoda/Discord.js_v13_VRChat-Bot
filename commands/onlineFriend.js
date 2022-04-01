const {SlashCommandBuilder} = require('@discordjs/builders')
const vrchat = require('vrchat')
const UserData = require('../Data/UserData.js')
const FavoritesUserData = require('../Data/FavoritesUser.js')
const { Client, ChannelManager } = require ("discord.js");
const { find } = require('../Data/UserData.js');
const { TopologyDescription } = require('mongodb');
module.exports = {
	data: new SlashCommandBuilder()
	.setName('online_friend')
	.setDescription('접속중인 친구 인원수를 조회합니다.'),
	async execute(interaction) {
		const DiscordUserId = interaction.user.id
		const FindUserData = await UserData.findOne()
		const FindFavoritesData = await FavoritesUserData.findOne();

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
				/*FriendsApi.getFriends().then(async resp =>{
					let result = `온라인 유저: ${resp.data.length}`;
					//( 숨김) 친구 목록 전체 표시 기능
					resp.data.forEach(x=> result += `\n ${x.displayName}, ${x.status}\n`)
					await interaction.reply(result);
				})*/
				console.log(FindFavoritesData.channel_name)
				console.log(FindFavoritesData.SetUserChannelID)
				FriendsApi.getFriends().then (async resp => {
					let Serch_displayName = resp.data;
						resp.data.forEach(x=> Serch_displayName += `${x.id}, ${x.status}\n`)
					
					const todo = Serch_displayName.split('\n').map(item=>item.split(','))


					let list = {}
					for(let [key,value] of todo){
						list[key]=value
					}

					let ListUserID = Object.keys(list)

					console.log(ListUserID)
					console.log(FindFavoritesData.SetUserID)
					if (ListUserID === FindFavoritesData.SetUserID){
						await interaction.guild.channels.cache.get('958698836614860801').send(Serch_displayName);
					}



					/*switch (result) {
						Client.channels.cache.get(`${FindFavoritesData.SetUserChannelID}`).send(`${FindFavoritesData.channel_name}상태변경 : 🔵 join me`);
						case "online" :
							await interaction.reply(`${channel_name}유저가 온라인 되었습니다.` /n `접속시간 측정을 시작 합니다.`);
							break;
						case "offline" :
							await interaction.reply(`${channel_name}유저가 온라인 되었습니다.` /n `접속시간 측정을 종료 합니다.`);
							break;
						
						case "join me" :
							client.channels.cache.get(`${FindFavoritesData.SetUserChannelID}`).send(`${FindFavoritesData.channel_name}상태변경 : 🔵 join me`);
							break;
						case "ask me" :
							client.channels.cache.get(`${FindFavoritesData.SetUserChannelID}`).send(`${FindFavoritesData.channel_name}상태변경 : 🟠 ask me`);
							break;
						case "busy" :
							client.channels.cache.get(`${FindFavoritesData.SetUserChannelID}`).send(`${FindFavoritesData.channel_name}상태변경 : 🔴 Busy`);
							break;
						case "active" :
							client.channels.cache.get(`${FindFavoritesData.SetUserChannelID}`).send(`${FindFavoritesData.channel_name}상태변경 : 🟡 Active`);
							break;
					}*/
				})
			}).catch(async error => await interaction.reply("아이디 또는 비밀번호가 틀립니다"));
		}
	},
};