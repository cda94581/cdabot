import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

module.exports = {
	name: 'giveaway',
	description: 'Run a giveaway (limited)',
	global: true,
	builder: new SlashCommandBuilder()
		.addChannelOption((option) => option
			.setName('channel')
			.setDescription('The channel to launch the giveaway in')
			.setRequired(true)
		)
		.addIntegerOption((option) => option
			.setName('duration')
			.setDescription('The duration (in hours) to run the giveaway')
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName('topic')
			.setDescription('The topic of the giveaway')
			.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		const channel = interaction.options.getChannel('channel');
		const duration = interaction.options.getInteger('duration') * 3600000;
		const topic = interaction.options.getString('topic');
		const ends = Math.floor((Date.now() + duration)/1000);

		const message = await channel.send({ embeds: [{
			color: embedcolors.giveaway,
			title: topic,
			description: `> **Giveaway!**\n**Ends**: <t:${ends}:R>`
		}]})
		message.react('🎉');
		message.ends = ends;
		setTimeout(() => message.client.customEvents.emit('giveawayEnd', message), duration);
		await interaction.reply({ content: 'Giveaway started!', ephemeral: true });
	}
}