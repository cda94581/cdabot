import { ChatInputCommandInteraction } from 'discord.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

export const command = {
	name: 'ping',
	description: 'Am I alive? And how long does it take me to respond to the server?',
	global: true,
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		await interaction.reply({ embeds: [{
			color: embedcolors.command,
			title: 'Pong!',
			description: `\`${Math.round(interaction.guild.shard.ping)}\`ms`
		}]});
	}
}