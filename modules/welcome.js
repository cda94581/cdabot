import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { welcomechannel } = config;

client.on('guildMemberAdd', async member => {
	const filePath = path.resolve(__dirname, '../_data/member_history.json');
	let memberhistory = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
	if (memberhistory.includes(member.id)) await client.channels.cache.get(welcomechannel).send({ content: `Oh hey there, ${member}, welcome back to **${member.guild.name}**! You are now member #${member.guild.memberCount}.` });
	else await client.channels.cache.get(welcomechannel).send({ content: `Hey, ${member}, welcome to **${member.guild.name}**! You are member #${member.guild.memberCount}. Enjoy your time here!` });
});