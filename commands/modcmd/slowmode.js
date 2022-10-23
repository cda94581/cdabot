module.exports = {
	name: 'slowmode',
	description: 'Sets a slowmode in a channel.',
	usage: '<TIME (in seconds)>',
	perms: [ 'MANAGE_CHANNELS' ],
	execute(message, args) {
		message.channel.setRateLimitPerUser(args[0]);
		message.channel.send({ content: `Slowmode set to ${args[0]} seconds.` });
		console.log(`\x1B[1m${Date().toString()} \x1B[3mSlowmode of ${args[0]} seconds set for \x1B[4m#${message.channel.name}\x1B[0m`);
	}
}