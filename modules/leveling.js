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

		const author = message.author.id;
		if (levelinfo.blacklist.channels.includes(message.channel.id) || levelinfo.blacklist.users.includes(author) || message.channel.type == 'DM' || message.content.startsWith(prefix) || message.author.bot) return;

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
		if (levelinfo.levels.includes(text.level)) {
			const roleToAdd = levelinfo.roles[levelinfo.levels.indexOf(text.level)];
			const role = message.member.guild.roles.cache.find(role => role.id == roleToAdd);
			message.member.roles.add(role);
		}
		fs.writeFileSync(filePath, JSON.stringify(text), 'utf-8');