const { prefix, modmessagingchannel } = require('../../config/config.json');

module.exports = {
	name: 'reply',
	description: 'Mods may use this to privately DM for any reason.',
	usage: '<message>',
	perms: [ 'BAN_MEMBERS', 'KICK_MEMBERS' ],
	args: true,
	// roles: [ 'Moderator', 'Helper' ],
	execute(message, args) {
		if (message.channel.parent.id != modmessagingchannel) return;
		const msg = message.content.slice(`${prefix}modcmd reply `.length);
		const attachments = message.attachments.map(m => m.url);
		try {
			const user = message.client.users.cache.get(message.channel.name);
			user.send({ content: msg, files: attachments });
			message.react('✅');
		} catch { message.react('❌'); }
	}
}