import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { modchat } = config;

client.on('threadCreate', async thread => {
	if (thread.parentId != modchat) return;
	await thread.setInvitable(false);
});

client.on('threadUpdate', async (ot, thread) => {
	if (thread.parentId != modchat) return;
	if (thread.invitable) await thread.setInvitable(false);
});