const fs = require('node:fs');
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9');
require('dotenv').config()


const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

//? 커멘드를 등록후 node commands.js를 적어 커멘드를 디스코드에 등록해준다.=
const commands = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.token);
//? 전역설정하기전 있어야하는것, 개별설정할때는 등록하기 위해 필요
rest
  .put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
  .then(() => console.log("커맨드 등록 완료"))
  .catch(console.error);

//? 전역설정 

//(async () => {
	//guildId.map(async(process.env.guildId) => {
	//	try{
	//		await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { 
	//			body: {},
	//		});
	//		console.log(`${guiguildIdldId} 개별 길드 변수 설정 완료`)
	//	} catch (error) {
	//		console.error(error)
	//	}
	//});

	//try{
	//	await rest.put(Routes.applicationCommands(process.env.clientId), {
	//		body: commands,
	//	});
	//	console.log(`전역변수 설정 완료(1시간 대기)`)
	//}
	//catch (error) {
	//	console.error(error);
	//}
//})();
