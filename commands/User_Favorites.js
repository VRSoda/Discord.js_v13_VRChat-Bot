const {SlashCommandBuilder} = require('@discordjs/builders');
const FavoritesUser = require('../Data/FavoritesUser.js');
const FavoritesUserData = require('../Data/FavoritesUser.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('user_favorites')
	.setDescription('관음 유저를 등록합니다.')
    .addStringOption(option => 
        option.setName('vrcname')
            .setDescription('채널 이름을 설정합니다.')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('username')
            .setDescription('유저 고유 아이디를 입력합니다.')
            .setRequired(true)
    ),
	async execute(interaction) {

        const DiscordUserId = interaction.user.id
        const DiscordUserTag = interaction.user.tag
        const FavoritesUserTag = interaction.options.getString('vrcname')
        const SetVRChatUserName = interaction.options.getString('username')

        const FavoritesData = await FavoritesUserData.find({});
        
        if(FavoritesData.SetUserID === SetVRChatUserName) {
            await interaction.reply("이미 등록된 유저입니다. 한번만 등록하세요!");
        }else {
            await interaction.reply("관음유저가 등록 되었습니다.");

            // 채널 생성후 생성한 채널 ID 획득
            let UserChnnelID;
            await interaction.guild.channels.create(`${FavoritesUserTag} `).then((channel) => {
                UserChnnelID = channel.id
            })
            
            // MongoDB 데이터 베이스 등록
            const insertData = new FavoritesUser({
                Discored_id:DiscordUserId,
                DiscordUserTag:DiscordUserTag,
                channel_name:FavoritesUserTag,
                SetUserID:SetVRChatUserName,
                SetUserChannelID:UserChnnelID
            })
            insertData.save().catch(console.error)

            // 생성한 채널 메세지 전송
            //await interaction.channels.reply(UserChnnelID).then(async(Message) => {
            //    await interaction.reply(`관음유저(${channel_name}의 알람이 시작되었습니다.`);
            //})
        }
    }
};