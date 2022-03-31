const {SlashCommandBuilder} = require('@discordjs/builders')
const UserData = require('../Data/UserData.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('vrchat_sign')
	.setDescription('디스코드 계정 데이터 등록 진행합니다.')
    .addStringOption(option =>
        option.setName('id')
            .setDescription('아이디를 입력합니다.')
            .setRequired(true)
    )
    .addStringOption(option => 
        option.setName('password')
            .setDescription('패스워드를 입력합니다.')
            .setRequired(true)
    ),
	async execute(interaction) {
        
        const VRC_Id = interaction.options.getString('id')
        const VRC_Password = interaction.options.getString('password')
        const DiscordUserId = interaction.user.id

        const FindUserData = await UserData.find({});
        
        if(FindUserData.Discored_id === DiscordUserId) {
            await interaction.reply("이미 등록된 유저입니다. 한번만 등록하세요!");
        }else {
            await interaction.reply("VRChat 계정이 등록 되었습니다.");
            const insertData = new UserData({
                Discored_id:DiscordUserId,
                VRChat_ID:VRC_Id,
                VRChat_PW:VRC_Password
            })
            insertData.save().catch(console.error)
        }
	},
};