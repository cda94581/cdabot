const { embedcolors } = require('../config/config.json');

module.exports = {
	name: 'ping',
	description: 'Am I alive? And how long does it take me to respond to the server?',
	execute(message) {
		message.channel.send({ embeds: [{
			color: embedcolors.command,
			title: 'Pong!',
			description: `\`${Math.round(message.guild.shard.ping)}\`ms`
		}]});
	}
}