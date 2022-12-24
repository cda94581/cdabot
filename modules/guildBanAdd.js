import chalk from 'chalk';
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

client.on('guildBanAdd', ban => {
	const desc = `${ban.user} - ${ban.user.tag}\n**ID**: ${ban.user.id}`;
	log({
		color: embedcolors.log,
		title: 'Member Banned',
		description: desc,
		timestamp: Date.now()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Banned')}: ${desc}`);
});