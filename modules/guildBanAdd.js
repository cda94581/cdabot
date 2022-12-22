const { embedcolors } = require('../config/config.json');

module.exports = ban => {
	const desc = `${ban.user} - ${ban.user.tag}\n**ID**: ${ban.user.id}`;

	require('./index').log({
		color: embedcolors.log,
		title: 'Member Banned',
		description: desc,
		timestamp: Date.now()
	});
	console.log(`\x1B[1m${Date().toString()} \x1B[3mMember Banned\x1B[0m: ${desc}`);
}