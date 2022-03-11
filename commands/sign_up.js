const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('vrchat_sign')
	.setDescription('VRChat login절차를 진행합니다.')
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

        const filePath = `./Data/UserData.json`
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify([])) : null;
        const UserData = JSON.parse(fs.readFileSync(filePath, "utf-8"));


        const DataID = UserData.find( DUI => DUI.DiscordUserId === DiscordUserId )
        if(DataID) {
            await interaction.reply("이미 등록된 유저입니다. 한번만 등록하세요!");
        }else {
            await interaction.reply("VRChat 계정이 등록 되었습니다.");
            UserData.push({DiscordUserId, VRC_Id, VRC_Password});
        }

        fs.writeFileSync(filePath, JSON.stringify(UserData, null, 2));
	},
};