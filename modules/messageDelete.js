const { embedcolors } = require('../config/config.json');

module.exports = message => {
	if (message.partial) return;

	const desc = message.content;
	const attachments = message.attachments.map(m => m.url);

	require('./index').log({
		color: embedcolors.log,
		title: `Message by ${message.author.tag} Deleted in #${message.channel.name}`,
		description: desc,
		timestamp: Date.now()
	}, attachments);
	console.log(`\x1B[1m${Date().toString()} \x1B[3mMessage by \x1B[4m${message.author.tag} \x1B[3mDeleted in \x1B[4m#${message.channel.name}\x1B[0m:\n${desc}\n\x1B[3mAttachments\x1B[0m:\n${message.attachments.map(m => m.name).join('\n')}`);

	// To Do: Before/After Messages
}