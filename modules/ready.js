import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

const fs = require('fs');
const path = require('path');
const https = require('https');
const xml = require('xml2js');
const { presence } = require('../config/config.json');

module.exports = client => {
	console.log(`${chalk.bold(Date().toString())} Ready!`);
	setPresence();
	getYoutube();

	function setPresence() {
		client.user.setPresence({ activities: [{ name: presence.name, type: presence.type }], status: presence.status});
		setTimeout(() => setPresence(), 3600000);
	}
	async function getYoutube() {
		let youtube = require('../config/youtube.json');
		const filePath = path.resolve(__dirname, '../config/youtube.json');
		const channels = Object.keys(youtube.channels);
		channels.forEach(channel => {
			https.get(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`, res => {
				let data = [];
				res.on('data', chunk => data.push(chunk));
				res.on('end', async () => {
					data = await xml.parseStringPromise(Buffer.concat(data).toString());
					const video = data.feed.entry[0]['yt:videoId'][0];
					const name = data.feed.author[0].name[0];
					const link = `https://youtu.be/${video}`;
					const message = youtube.message.replaceAll('{{channel}}', name).replaceAll('{{link}}', link);
					if (youtube.channels[channel].includes(video)) return;
					youtube.channels[channel].unshift(video);
					client.channels.cache.get(youtube.channel).send({ content: message });
					fs.writeFileSync(filePath, JSON.stringify(youtube, null, '\t'), 'utf-8');
				});
			});
		});
		setTimeout(() => getYoutube(), 60000);
	}
}