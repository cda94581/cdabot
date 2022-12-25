import { client } from '../index.js';
import reactionroles from '../config/reactionroles.json' assert { type: 'json' };

client.on('messageReactionAdd', async (messageReaction, user) => {
	if (messageReaction.partial) {
		try { await messageReaction.fetch(); }
		catch (error) { return console.error(error); }
	}
	reactionroles.forEach(async rr => {
		if (messageReaction.message.channelId == rr.channel
			&& messageReaction.message.id == rr.message
			&& (messageReaction.emoji.id || messageReaction.emoji.name) == rr.emoji) messageReaction.message.guild.members.resolve(user)
				.roles.add(await messageReaction.message.guild.roles.fetch(role));
	});
});

client.on('messageReactionRemove', async (messageReaction, user) => {
	if (messageReaction.partial) {
		try { await messageReaction.fetch(); }
		catch (error) { return console.error(error); }
	}
	reactionroles.forEach(async rr => {
		if (messageReaction.message.channelId == rr.channel
			&& messageReaction.message.id == rr.message
			&& (messageReaction.emoji.id || messageReaction.emoji.name) == rr.emoji) messageReaction.message.guild.members.resolve(user)
				.roles.remove(await messageReaction.message.guild.roles.fetch(role));
	});
});