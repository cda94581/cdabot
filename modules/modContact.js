import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

const xpCooldowns = new Set();
const { prefix, modmessagingchannel, levelinfo, embedcolors } = require('../config/config.json');
const bannedwords = require('../config/bannedwords.json');
const triggers = require('../config/triggers.json');
const commandList = require('../config/command.json');
const fs = require('fs-extra');
const path = require('path');


		if (message.channel.type != 'DM' || message.author.bot) return;
		const filePath = path.resolve(__dirname, '../_data/mod_chat.json');
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, '{}');
		let dataFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		const channel = message.client.channels.cache.get(modmessagingchannel);
		const threadId = dataFile[message.author.id];
		if (!threadId) {
			await channel.threads.create({ name: message.author.id }).then(t => {
				t.send({ content: `REFERENCE: Created on ${Date().toString()}\nUser: ${message.author} (**${message.author.tag}**)\n---` }).then(msg => msg.pin());
				dataFile[message.author.id] = t.id;
			});
			fs.writeFileSync((filePath), JSON.stringify(dataFile, null, '\t'), 'utf-8');
			return modmessaging();
		}
		let thread = channel.threads.cache.get(threadId);
		if (!thread) thread = (await channel.threads.fetchArchived()).threads.get(threadId);

		const attachments = message.attachments.map(m => m.url);
		if (thread.archived) thread.setArchived(false);
		thread.send({ content: message.content, files: attachments });
		try { message.react('✅'); } catch {}