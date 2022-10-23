module.exports = {
	name: 'giveaway',
	description: 'Run a giveaway (limited)',
	perms: [ 'ADMINISTRATOR' ],
	args: true,
	usage: '<Channel ID> <Duration in Minutes> <Topic>',
	execute(message, args) {
		const channel = message.client.channels.cache.find(c => c.id == args[0]);
		if (!channel) return message.channel.send({ content: 'I couldn\'t find that channel.' });
		const duration = args[1] * 60000;
		args.shift(); args.shift();
		const topic = args.join(' ');
		const ends = Math.floor((Date.now() + duration)/1000);

		channel.send({ embeds: [{
			color: 'BLURPLE',
			title: topic,
			description: `> **Giveaway!**\n**Ends**: <t:${ends}:R>`
		}]}).then(msg => {
			msg.react('🎉');
			msg.ends = ends;
			setTimeout(() => message.client.customEvents.emit('giveawayEnd', (msg)), duration);
		});
	}
}