import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import https from 'https';
import xml from 'xml2js';
import { client } from '../index.js';

const getYoutube = async () => {
	const filePath = path.resolve(__dirname, '../config/youtube.json');
	let youtube = (await import(filePath, { assert: { type: 'json' }})).default;
	const channels = Object.keys(youtube.channels);
	channels.forEach(channel => {
		https.get(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`, res => {
			let data = [];
			res.on('data', data.push);
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
	setTimeout(getYoutube, 60000);
}

client.once('ready', getYoutube);