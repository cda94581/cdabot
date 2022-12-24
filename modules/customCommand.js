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