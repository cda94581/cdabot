import { Message } from 'discord.js';
import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;
import triggers from '../config/triggers.json' assert { type: 'json' };

client.customEvents.on('messageCreateCheck', async (message = Message.prototype) => {
	const trigger = triggers.find(t =>
		(t.type == 'exact' && t.names.some(name => message.content.toLowerCase() == name.toLowerCase())) ||
		(t.type == 'contain' && t.names.some(name => message.content.toLowerCase().includes(name.toLowerCase())))
	);
	if (!trigger) return;
	if (trigger.channels && !trigger.channels.includes(message.channelId)) return;
	const embeds = trigger.embeds.map(embed => { return { color: embedcolors.trigger, title: embed.title, description: embed.description } });
	try { await message.channel.send({ embeds: embeds }); }
	catch (error) {
		console.error(error);
		return await (await message.guild.fetchOwner()).send(`Hey there, there was an error trying to execute trigger: **${triggers.indexOf(trigger)}**`);
	}
});