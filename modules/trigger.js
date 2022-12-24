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