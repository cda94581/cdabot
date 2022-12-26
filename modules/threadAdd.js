import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { modrole, placeholder } = config;

client.on('threadCreate', async thread => {
	await thread.join();
	const message = await thread.send({ content: placeholder });
	await message.edit({ content: `<@&${modrole}>` });
	await message.delete();
});