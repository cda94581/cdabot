const { embedcolors } = require('../config/config.json');

module.exports = async (oldUser, newUser) => {
	if (oldUser.partial) {
		try { await oldUser.fetch(); }
		catch { return console.error(error); }
	}

	let desc = '';
	if (oldUser.discriminator != newUser.discriminator) desc += `\n**Discriminator Changed** - \`Old\`: ${oldUser.discriminator} \`New\`: ${newUser.discriminator}`;
	if (oldUser.username != newUser.username) desc += `\n**Username Changed** - \`Old\`: ${oldUser.username} \`New\`: ${newUser.username}`
	if (!desc.length) return;
	desc = `${oldUser}${desc}`;

	require('./index').log({
		color: embedcolors.log,
		title: `User Updated: ${oldUser.tag}`,
		description: desc,
		thumbnail: { url: newUser.displayAvatarURL({ format: 'png', dynamic: true }) },
		timestamp: Date.now()
	});
	console.log(`\x1B[1m${Date().toString()} \x1B[3mMember Updated: \x1B[4m${oldUser.tag}\x1B[0m:\n${desc}\n`);
}