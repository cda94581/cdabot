import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { modchat, modrole, placeholder } = config;

client.on('threadCreate', async thread => {
	if (thread.parentId != modchat) return;
	await thread.join();
	await thread.setInvitable(false);
	const message = await thread.send({ content: placeholder });
	await message.edit({ content: `<@&${modrole}>` });
	await message.delete();
});

client.on('threadUpdate', async (ot, thread) => {
	if (thread.parentId != modchat) return;
	if (thread.invitable) await thread.setInvitable(false);
});