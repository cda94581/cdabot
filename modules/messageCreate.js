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

module.exports = async (message) => {
	if (message.author.bot) return;

	modmessaging();
	if (moderation()) {
		leveling();
		json_format();
		runCommand();
		runCustomCommand();
		runTrigger();
	}

	async function modmessaging() {
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
	}

	function moderation() {
		if (message.channel.type == 'DM' || message.author.id == message.guild.ownerId) return true;
		if (bannedwords.some(phrase => message.content.toLowerCase().includes(phrase))) {
			message.delete();
			message.channel.send({ content: `${message.author}, you aren't allowed to say this phrase.` })
				.then(sentMsg => setTimeout(() => sentMsg.delete(), 5000));
			return false;
		} else return true;
	}

	function leveling() {
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
	}

	function json_format() {
		let data = null;
		let text = message.content;
		try { data = JSON.parse('{' + text + '}'); } catch {}
		try { data = JSON.parse('[' + text + ']'); } catch {}
		try { data = JSON.parse(text); } catch {}
		if (data && text.length > 60) message.channel.send({ content: `Hey, ${message.member.displayName}, I've formatted the JSON for you!\n\`\`\`json\n${JSON.stringify(data, null, '\t')}\`\`\`` });
	}

	function runCommand() {
		if (!message.content.startsWith(prefix)) return;
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;

		if (command.guildOnly && message.channel.type == 'DM') return message.channel.send({ content: 'I can\'t execute this command inside DMs' });
		if (command.perms) for (perm of command.perms) if (!message.member.permissions.has(eval(`require('discord.js').Permissions.FLAGS.${perm}`)))
			return message.channel.send({ content: 'You don\'t have the permission to use this command' });

		if (command.args && !args.length) {
			let reply = 'You didn\'t provide any arguments';
			if (command.usage) reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			return message.channel.send({ content: reply });
		}

		try { setTimeout(() => command.execute(message, args), 2000); }
		catch (error) {
			console.error(error);
			return message.channel.send({ content: 'There was an error trying to execute that command' });
		}
	}

	function runCustomCommand() {
		if (!message.content.startsWith(prefix)) return;
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = commandList.find(cmd => cmd.name == commandName || (cmd.aliases && cmd.aliases.includes(commandName)));
		if (!command) return;

		const { message: msg } = command;
		const embeds = command.embeds.map(embed => { return { color: embedcolors.color, title: embed.title, description: embed.description } });

		try { setTimeout(() => message.channel.send({ content: msg, embeds: embeds }), 2000); }
		catch (error) {
			console.error(error);
			return message.channel.send({ content: 'There was an error trying to execute that command' });
		}
	}

	function runTrigger() {
		const trigger = triggers.find(t =>
			(t.type == 'exact' && t.names.some(name => message.content.toLowerCase() == name.toLowerCase())) ||
			(t.type == 'contain' && t.names.some(name => message.content.toLowerCase().includes(name.toLowerCase())))
		);
		if (!trigger) return;
		if (trigger.channels && !trigger.channels.some(channel => message.channel.id == channel)) return;
		const embeds = trigger.embeds.map(embed => { return { color: embedcolors.trigger, title: embed.title, description: embed.description } });
		try { setTimeout(() => message.channel.send({ embeds: embeds }), 2000); }
		catch (error) {
			console.error(error);
			return message.guild.fetchOwner().send(`Hey there, there was an error trying to execute trigger: **${triggers.indexOf(trigger)}**`);
		}
	}
}