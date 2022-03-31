const {SlashCommandBuilder} = require('@discordjs/builders')
const UserData = require('../Data/UserData.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('vrchat_sign_delete')
	.setDescription('디스코드 계정 데이터 삭제를 진행합니다.')
    .addStringOption(option =>
        option.setName('discord_id')
            .setDescription('디스코드 고유 아이디 입력')
            .setRequired(true)
    ),
	async execute(interaction) {
        const DiscordUserId = interaction.user.id

        const FindUserData = await UserData.find({});

        if(FindUserData.Discored_id === DiscordUserId) {
            await interaction.reply("계정이 삭제 되었습니다");
            UserData.deleteOne( { Discored_id : DiscordUserId }).catch(console.error)
        }else {
            await interaction.reply("삭제 되거나 등록되지 않았습니다.");
        }
	},
};