import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

module.exports = message => {
	if (message.partial) return;

	const desc = message.content;
	const attachments = message.attachments.map(m => m.url);

	require('./index').log({
		color: embedcolors.log,
		title: `Message by ${message.author.tag} Deleted in #${message.channel.name}`,
		description: desc,
		timestamp: Date.now()
	}, attachments);
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Message by')} ${chalk.underline(message.author.tag)} ${chalk.italic('Deleted in')} ${chalk.underline(`#${message.channel.name}`)}:\n${desc}\n${chalk.italic('Attachments')}:\n${message.attachments.map(m => m.name).join('\n')}`);

	// To Do: Before/After Messages
}