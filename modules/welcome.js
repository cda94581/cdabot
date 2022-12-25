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

client.on('guildMemberAdd', async member => {
	const filePath = path.resolve(__dirname, '../_data/member_history.json');
	let memberhistory = fs.existsSync(filePath) ? (await import(filePath, { assert: { type: 'json' }})).default : [];
	if (memberhistory.includes(member.id)) await client.channels.cache.get(welcomechannel).send({ content: `Oh hey there, ${member}, welcome back to **${member.guild.name}**! You are now member #${member.guild.memberCount}.` });
	else await client.channels.cache.get(welcomechannel).send({ content: `Hey, ${member}, welcome to **${member.guild.name}**! You are member #${member.guild.memberCount}. Enjoy your time here!` });
});