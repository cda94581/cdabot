const { embedcolors } = require('../config/config.json');

module.exports = async (oldMember, newMember) => {
	if (oldMember.partial) {
		try { oldMember.fetch(); }
		catch (error) { return console.error('Something went wrong: ', error); }
	}
	if (oldMember.user != newMember.user) return;

	let desc = '';
	if (oldMember.displayAvatarURL() != newMember.displayAvatarURL()) desc += `\n**Avatar Changed**`;
	if (oldMember.displayName != newMember.displayName) desc += `\n**Display Name Changed** -\`Old\`: ${oldMember.displayName} \`New\`: ${newMember.displayName}`;

	const oldRoles = Array.from(oldMember.roles.cache.keys());
	const newRoles = Array.from(newMember.roles.cache.keys());
	const removedRoles = oldRoles.filter(r => !newRoles.includes(r));
	const addedRoles = newRoles.filter(r => !oldRoles.includes(r));
	if (removedRoles.length) desc += `\n**Removed**: <@&${removedRoles.join('> <@$')}>`;
	if (addedRoles.length) desc += `\n**Added**: <@&${addedRoles.join('> <@$')}>`;

	if (!desc.length) return;
	desc = `${oldMember}${desc}`;

	require('./index').log({
		color: embedcolors.log,
		title: `Member Updated: ${oldMember.user.tag}`,
		description: desc,
		thumbnail: { url: newMember.displayAvatarURL({ format: 'png', dynamic: true }) },
		timestamp: Date.now()
	});
	console.log(`\x1B[1m${Date().toString()} \x1B[3mMember Updated: \x1B[4m${oldMember.user.tag}\x1B[0m:\n${desc}`);
}