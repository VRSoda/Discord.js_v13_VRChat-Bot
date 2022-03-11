const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('vrchat_sign_delete')
	.setDescription('등록되어있는 아이디를 삭제합니다.')
    .addStringOption(option =>
        option.setName('discord_id')
            .setDescription('디스코드 고유 아이디 입력')
            .setRequired(true)
    ),
	async execute(interaction) {
        
        const Option_Discord_ID = interaction.options.getString('Discord ID')
        const DiscordUserId = interaction.user.id

        const filePath = `./Data/UserData.json`

        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify([])) : null;

        const UserData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const DataID = UserData.find( DUI => DUI.DiscordUserId === DiscordUserId )
        if(DataID) {
            await interaction.reply("삭제 되거나 등록하지 않았습니다.");
        }else {
            await interaction.reply("계정이 삭제 되었습니다");
            UserData.push({DiscordUserId, Option_Discord_ID});
        }

        fs.unlink(filePath, JSON.stringify(UserData, null, 2));
	},
};