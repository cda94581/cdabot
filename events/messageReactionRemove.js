const reactionroles = require('../config/reactionroles.json');

module.exports = async (messageReaction, user) => {
	if (messageReaction.partial) {
		try { await messageReaction.fetch(); }
		catch (error) { return console.error(error); }
	}
	for (rr of reactionroles) {
		if ((messageReaction.message.channel.id == rr.channel) && (messageReaction.message.id == rr.message) && (( messageReaction.emoji.id || messageReaction.emoji.name ) == rr.emoji)) {
			const role = messageReaction.message.member.guild.roles.cache.find(role => role.id == rr.role);
			const member = messageReaction.message.member;
			return member.roles.remove(role);
		}
	}
}