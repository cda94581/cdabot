import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

module.exports = messages => {
	const data = messages.map(m => m);
	const authors = messages.map(m => m.author).reverse();
	const content = messages.map(m => m.content).reverse();
	let desc = [ '' ];
	data.forEach((d, i) => desc[0] += `[${authors[i]}] ${content[i]}\n`);
	for (i = 0; i < desc.length; i++) {
		if (desc[i].length > 2000) {
			const tempData = desc[i];
			desc[i] = tempData.slice(0, 2000);
			desc.push(tempData.slice(2000));
		}

		require('./index').log({
			color: embedcolors.log,
			title: `Bulk Messages Deleted in #${data[0].channel.name}`,
			description: desc[i],
			timestamp: Date.now()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Bulk Messages Deleted in')} ${chalk.underline(`#${data[0].channel.name}`)}:${desc[i]}`);
	}
}