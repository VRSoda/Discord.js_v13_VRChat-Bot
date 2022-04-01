const {SlashCommandBuilder} = require('@discordjs/builders')
const FavoritesUserData = require('../Data/FavoritesUser.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('user_favorites_delete')
	.setDescription('관음 유저를 삭제합니다.')
    .addStringOption(option =>
        option.setName('favorites_id')
            .setDescription('관음유저 고유 아이디 입력')
            .setRequired(true)
    ),
	async execute(interaction) {
        
        const Favorites_id = interaction.options.getString('favorites_id')

        const FindFavoritesData = await FavoritesUserData.findOne();
        
        if(FindFavoritesData.SetUserID === Favorites_id) {
            await interaction.reply("계정이 삭제 되었습니다");
            FindFavoritesData.deleteOne( { SetUserID : Favorites_id }).catch(console.error)
        }else {
            await interaction.reply("삭제 되거나 등록되지 않았습니다.");
        }
	},
};
