// Custom Commands
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;
import commandList from '../config/command.json' assert { type: 'json' };

export const command = {
	name: 'other',
	description: 'Custom commands',
	global: true,
	builder: new SlashCommandBuilder()
		.addStringOption((option) => option
			.setName('name')
			.setDescription('The command string')
			.setAutocomplete(true)
			.setRequired(true)
		),
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		const commandName = interaction.options.getString('name');
		const command = commandList.find(cmd => cmd.name.toLowerCase() == commandName);
		const embeds = command.embeds.map(embed => { return { color: embedcolors.command, title: embed.title, description: embed.description } });
		return await interaction.reply({ content: command.message, embeds: embeds });
	}
}