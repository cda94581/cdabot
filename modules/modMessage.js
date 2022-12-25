import { ChannelType } from 'discord.js';
import { client } from '../index.js';
import bannedwords from '../config/bannedwords.json' assert { type: 'json' };

client.on('messageCreate', async message => {
	if (message.channel.type == ChannelType.DM || message.author.id == message.guild.ownerId) return client.customEvents.emit('messageCreateCheck', message);
	if (!bannedwords.some(phrase => message.content.toLowerCase().includes(phrase))) return client.customEvents.emit('messageCreateCheck', message);
	message.delete();
	const warn = await message.channel.send({ content: `${message.author}, you aren't allowed to say this phrase.` });
	setTimeout(warn.delete, 5000);
});

client.on('messageUpdate', (oM, message) => {
	if (message.channel.type == ChannelType.DM || message.author.id != message.guild.ownerId) return;
	if (bannedwords.some(phrase => message.content.toLowerCase().includes(phrase))) message.delete();
});