import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

export const command = {
	name: 'rank',
	description: 'Checks your level on the cdaBot leveling system',
	global: true,
	builder: new SlashCommandBuilder()
		.addUserOption((option) => option
			.setName('user')
			.setDescription('[OPTIONAL] User to get the rank of')
		),
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		const member = interaction.options.getMember('user') || interaction.member;
		const author = member.id;
		const filePath = path.resolve(__dirname, `../_data/leveling/${author}.json`);
		if (!fs.existsSync(filePath)) return await interaction.reply({ content: 'You aren\'t ranked yet, send some messages to gain XP.' });
		const info = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		const toLevelUp = 5 * (info.level ** 2) + 50 * info.level + 100;
		await interaction.reply({ embeds: [{
			color: embedcolors.command,
			title: `cdaBot Leveling - ${member.displayName}`,
			description: `**Level**: ${info.level}\n**XP**: ${info.xp}/${toLevelUp}\n**Messages**: ${info.messages}`
		}]});
	}
}