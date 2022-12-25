import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;
import faqList from '../config/faq.json' assert { type: 'json' };

export const command = {
	name: 'faq',
	description: 'Common issues and things to know',
	global: true,
	builder: new SlashCommandBuilder()
		.addStringOption((option) => option
			.setName('name')
			.setDescription('The FAQ string')
			.setAutocomplete(true)
			.setRequired(true)
		),
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		const faqName = interaction.options.getString('name');
		const faq = faqList.find(f => f.name.toLowerCase() == faqName);
		const embeds = faq.embeds.map(embed => { return { color: embedcolors.faq, title: embed.title, description: embed.description } });
		return await interaction.reply({ embeds: embeds });
	}
}