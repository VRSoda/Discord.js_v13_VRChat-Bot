// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
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
  console.log(`현재 Prefix 상태는`+prefix,'입니다');
});


//? 이모지를 등록하고싶을때는 {windows + .} 단축키
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
	}
});

//? 디스코드 봇 로그인
client.login(token);