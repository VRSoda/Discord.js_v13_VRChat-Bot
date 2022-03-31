const fs = require('node:fs');
const mongoose = require ("mongoose");
const express = require ("express");
const { Client, Collection } = require ("discord.js");
const { Intents } = require ('discord.js')
const app = express();
const port = 5000;
const dotenv = require ('dotenv')
dotenv.config();
const vrchat = require('vrchat')


const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	],
	presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: '딩굴딩굴 코딩',
            type: 'WATCHING',
        }],
    },
 });
 client.commands = new Collection();
 const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//? 봇 서버가 실행되면, 한번만 사용하는 함수
client.once('ready', () => {
	console.log(`${client.user.tag} 을 실행합니다.`);
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB 연결 완료'))
.catch(error => console.log(error))

app.get('/', (req, res) => res.send('Develog!'))
app.listen(port, () => console.log(`${port}포트 연결 완료`))

//? 이모지를 등록하고싶을때는 {windows + .} 단축키
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		command.execute(interaction);
	} catch (error) {
		console.error(error);
		interaction.reply({ content: '명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
	}
});


client.on('interaction', async interaction => {
	const UserData = require('./Data/UserData.js')
	const timer = ms=>new Promise(res=>settimeout(res.ms))

		const FindUserData = await UserData.findOne()
		const IK = FindUserData.VRChat_ID
		const PK = FindUserData.VRChat_PW
				
				
		const configuration = new vrchat.Configuration({
			username: IK,
			password: PK
		})

		const AuthenticationApi = new vrchat.AuthenticationApi(configuration) // 토큰 만들기
		const FriendsApi = new vrchat.FriendsApi(configuration);
		const WorldApi = new vrchat.InstancesApi(configuration);
		
		while ( true ) { // 무한반복
			if(FindUserData.Discored_id === FindUserData.Discored_id) {
				AuthenticationApi.getCurrentUser().then(resp => {
					//? 유저 프로필 상태변경
					FriendsApi.getFriendStatus.then (async resp => {
						let Onlinestatus = resp.data
							resp.data.forEach(x=> Onlinestatus += `${x.status}\n`)
						
						switch (Onlinestatus) {
							case "friend-online" :
								await interaction.reply(`${channel_name}유저가 온라인 되었습니다.` /n `접속시간 측정을 시작 합니다.`);
								break;
							case "friend-offline" :
								await interaction.reply(`${channel_name}유저가 온라인 되었습니다.` /n `접속시간 측정을 종료 합니다.`);
								break;
							case "friend-join me" :
								await interaction.reply(`${channel_name}상태변경 : 🔵 join me`);
								break;
							case "friend-ask me" :
								await interaction.reply(`${channel_name}상태변경 : 🟠 ask me`);
								break;
							case "friend-busy" :
								await interaction.reply(`${channel_name}상태변경 : 🔴 Busy`);
								break;
							case "friend-active" :
								await interaction.reply(`${channel_name}상태변경 : 🟡 Active`);
								break;
						}
					})
					//?유저 프로필 사진 확인
					FriendsApi.getFriends().then(async resp =>{
						let FriednsProfileImage = resp.data
						resp.data.forEach(x=> FriednsProfileImage += `${x.currentAvatarThumbnailImageUrl}\n`)
						await interaction.reply(FriednsProfileImage);
					})
					//?월드 이동 확인
					WorldApi.getInstance().then(async resp =>{
						let wolrdtype = resp.data
							resp.data.forEach(x=> Onlinestatus += `${x.type}\n`)
						
						switch (wolrdtype) {
							case "public" :
								await interaction.reply(`${channel_name}유저가 온라인 되었습니다.` /n `접속시간 측정을 시작 합니다.`);
								break;
							case "hidden" :
								await interaction.reply(`${channel_name}유저가 온라인 되었습니다.` /n `접속시간 측정을 종료 합니다.`);
								break;
							case "friends" :
								await interaction.reply(`${channel_name}상태변경 : 🔵 join me`);
								break;
							case "private" :
								await interaction.reply(`${channel_name}상태변경 : 🟠 ask me`);
								break;
							case "busy" :
								await interaction.reply(`${channel_name}상태변경 : 🔴 Busy`);
								break;
							case "active" :
								await interaction.reply(`${channel_name}상태변경 : 🟡 Active`);
								break;
						}
					})
				})
			}
			await timer(60000)
		}
})
//? 디스코드 봇 로그인
client.login(process.env.Token);
