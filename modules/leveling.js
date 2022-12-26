import { ChannelType, Message } from 'discord.js';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { levelinfo } = config;
const xpCooldowns = new Set();

client.customEvents.on('messageCreateCheck', async (message = Message.prototype) => {
	const author = message.author.id;
	if (Object.keys(levelinfo.blacklist.channels).includes(message.channelId)
		|| Object.keys(levelinfo.blacklist.channels).includes(message.channel.parentId)
		|| Object.keys(levelinfo.blacklist.users).includes(author)
		|| message.channel.type == ChannelType.DM
		|| message.author.bot) return;

	if (xpCooldowns.has(author)) return;

	xpCooldowns.add(author);
	setTimeout(() => xpCooldowns.delete(author), 60000);

	const filePath = path.resolve(__dirname, `../_data/leveling/${author}.json`);

	if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `{"id":"${author}","level":0,"xp":0,"messages":0}`, 'utf-8');
	let text = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	if (text.level >= levelinfo.max) return;
	const xpToLevel = 5 * (text.level ** 2) + 50 * text.level + 100;
	const addXp = Math.floor(Math.random() * 11) + 15;
	text.xp += addXp;
	text.messages++;
	if (xpToLevel <= text.xp) {
		text.xp -= xpToLevel;
		text.level++;
		message.channel.send({ content: `Nice chatting, ${message.author}, you've advanced to level ${text.level}!` });
	}
	if (levelinfo.roles[text.level]) levelinfo.roles[text.level].forEach(async role => await message.member.roles.add(await message.guild.roles.fetch(role)));
	fs.writeFileSync(filePath, JSON.stringify(text), 'utf-8');
});