const { embedcolors } = require('../config/config.json');

module.exports = async member => {
	if (member.partial) {
		try { await member.fetch(); }
		catch (error) { require('./index').log({
				color: embedcolors.log,
				title: 'Member Left',
				description: 'Unable to fetch data',
				timestamp: Date.now()
			}); return console.error(error); }
	}

	const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.user.id}`;

	require('./index').log({
		color: embedcolors.log,
		title: 'Member Left',
		description: desc,
		timestamp: Date.now()
	});
	console.log(`\x1B[1m${Date().toString()} \x1B[3mMember Left\x1B[0m: ${desc}`);
}