import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors, levelinfo } = config;

export const command = {
	name: 'leaderboard',
	description: 'Server rank leaderboard',
	global: true,
	builder: new SlashCommandBuilder()
		.addIntegerOption((option) => option
			.setName('page')
			.setDescription('Optional page number of the leaderboard')
		),
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		const levelFiles = fs.readdirSync(path.resolve(__dirname, '../_data/leveling'), 'utf-8').filter(f => f.endsWith('.json'));
		let levelData = [];
		for (const file of levelFiles) levelData.push(JSON.parse(fs.readFileSync(`../_data/leveling/${file}`, 'utf-8')));
		levelData = levelData.filter(a => a.level < levelinfo.max).sort((a, b) => b.level - a.level || b.xp - a.xp);

		let data = ['**PLACE. USER - LEVEL/XP - MESSAGES**\n'];
		levelData.forEach((member, i) => {
			let dataIndex = Math.floor(i / 20);
			if (!data[dataIndex]) data[dataIndex] = '**PLACE. USER - LEVEL/XP - MESSAGES**\n';
			data[dataIndex] += `${i*1+1}. <@!${member.id}> - ${member.level}/${member.xp} - ${member.messages}\n`;
		});

		const page = interaction.options.getInteger('page');

		interaction.reply({ embeds: [{
			color: embedcolors.command,
			title: 'cdaBot Leaderboard',
			description: data[page ? page - 1 : 0],
			footer: { text: `Leaderboard Page ${page ? page : '1'}/${data.length}` }
		}]});
	}
}