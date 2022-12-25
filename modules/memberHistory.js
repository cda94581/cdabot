import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';

client.on('guildMemberAdd', async member => {
	const filePath = path.resolve(__dirname, '../_data/member_history.json');
	if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, '[]', 'utf-8');
	let memberhistory = (await import(filePath, { assert: { type: 'json' }})).default
	if (!memberhistory.includes(member.id)) {
		memberhistory.push(member.id);
		fs.writeFileSync(filePath, JSON.stringify(memberhistory, null, '\t'));
	}
});