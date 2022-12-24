import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

module.exports = async (oldUser, newUser) => {
	if (oldUser.partial) {
		try { await oldUser.fetch(); }
		catch { return console.error(error); }
	}

	let desc = '';
	if (oldUser.discriminator != newUser.discriminator) desc += `\n**Discriminator Changed** - \`Old\`: ${oldUser.discriminator} \`New\`: ${newUser.discriminator}`;
	if (oldUser.username != newUser.username) desc += `\n**Username Changed** - \`Old\`: ${oldUser.username} \`New\`: ${newUser.username}`
	if (!desc.length) return;
	desc = `${oldUser}${desc}`;

	require('./index').log({
		color: embedcolors.log,
		title: `User Updated: ${oldUser.tag}`,
		description: desc,
		thumbnail: { url: newUser.displayAvatarURL({ format: 'png', dynamic: true }) },
		timestamp: Date.now()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Updated:')} ${chalk.underline(oldUser.tag)}:\n${desc}\n`);
}