import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

module.exports = async member => {
	if (member.partial) {
		try { await member.fetch(); }
		catch (error) { require('./index').log({
				color: embedcolors.log,
				title: 'Member Left',
				description: 'Unable to fetch data',
				timestamp: Date.now()
			}); return console.error(error); }
	}

	const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.user.id}`;

	require('./index').log({
		color: embedcolors.log,
		title: 'Member Left',
		description: desc,
		timestamp: Date.now()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Left')}: ${desc}`);
}