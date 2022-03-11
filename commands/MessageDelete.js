const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('delete')
	.setDescription('메세지를 삭제합니다(최대 100개)'),
	async execute(interaction) {
        
        let channel = message.channel.fetch();
        let fetched;
        do {
          fetched = message.channel.fetch({
              limit: 100
          });
          message.channel.bulkDelete(fetched);
        }
        while (fetched.size >= 2);

        await interaction.reply("메세지를 삭제하였습니다. " + channel);
	},
};