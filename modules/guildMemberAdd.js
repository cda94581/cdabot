import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

const fs = require('fs-extra');
const path = require('path');
const { welcomechannel, embedcolors } = require('../config/config.json');
const bannedwords = require('../config/bannedwords.json');

module.exports = async member => {
	if (member.partial) {
		try { await member.fetch(); }
		catch (error) { return console.error(error); }
	}

	if (member.id != member.guild.ownerID) if (bannedwords.some(phrase => member.displayName.toLowerCase().includes(phrase))) member.setNickname( 'Name', 'Inappropriate Name' ); // Improve this

	const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.id}\n**Account Created**: ${member.user.createdAt}`;

	const filePath = path.resolve(__dirname, '../_data/member_history.json');
	if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, '[]', 'utf-8');
	let memberhistory = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	if (memberhistory.includes(member.id)) {
		require('./index').log({
			color: embedcolors.log,
			title: 'Member Rejoined',
			description: desc,
			timestamp: Date.now()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Rejoined')}: ${desc}`);
	
		member.client.channels.cache.get(welcomechannel).send({ content: `Oh hey there, ${member}, welcome back to **${member.guild.name}**! You are now member #${member.guild.memberCount}.` });
	} else {
		require('./index').log({
			color: embedcolors.log,
			title: 'Member Joined',
			description: desc,
			timestamp: Date.now()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Joined')}: ${desc}`);
	
		member.client.channels.cache.get(welcomechannel).send({ content: `Hey, ${member}, welcome to **${member.guild.name}**! You are member #${member.guild.memberCount}. Enjoy your time here!` });

		memberhistory.push(member.id);
		fs.writeFileSync(filePath, JSON.stringify(memberhistory, null, '\t'));
	}
}