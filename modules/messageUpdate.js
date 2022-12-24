import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

const bannedwords = require('../config/bannedwords.json');

module.exports = async (oldMessage, newMessage) => {
	if (oldMessage.partial) {
		try { await oldMessage.fetch(); }
		catch (error) { return console.error('Something went wrong: ', error); }
	}

	if (newMessage.channel.type != 'DM' && newMessage.author.id != newMessage.guild.ownerId) {
		if (bannedwords.some(phrase => newMessage.content.toLowerCase().includes(phrase))) {
			newMessage.delete();
			newMessage.channel.send({ content: `${newMessage.author}, you aren't allowed to say this phrase.` })
				.then(sentMsg => setTimeout(() => sentMsg.delete(), 5000));
		}
	}

	if (oldMessage.content == newMessage.content) return;
	let desc = [ `**Old**:\n${oldMessage.content}\n\n**New**:\n${newMessage.content}\n\n[Jump](${newMessage.url})` ];
	for (i = 0; i < desc.length; i++) {
		if (desc[i].length > 2000) {
			const tempData = desc[i];
			desc[i] = tempData.slice(0, 2000);
			desc.push(tempData.slice(2000));
		}

		require('./index').log({
			color: embedcolors.log,
			title: `Message Updated in #${oldMessage.channel.name}`,
			description: desc[i],
			timestamp: Date.now()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Message Updated in')} ${chalk.underline(`#${oldMessage.channel.name}`)}:\n${desc[i]}`);
	}
}