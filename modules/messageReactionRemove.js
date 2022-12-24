import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

const reactionroles = require('../config/reactionroles.json');

module.exports = async (messageReaction, user) => {
	if (messageReaction.partial) {
		try { await messageReaction.fetch(); }
		catch (error) { return console.error(error); }
	}
	for (rr of reactionroles) {
		if ((messageReaction.message.channel.id == rr.channel) && (messageReaction.message.id == rr.message) && (( messageReaction.emoji.id || messageReaction.emoji.name ) == rr.emoji)) {
			const role = messageReaction.message.member.guild.roles.cache.find(role => role.id == rr.role);
			const member = messageReaction.message.member;
			return member.roles.remove(role);
		}
	}
}