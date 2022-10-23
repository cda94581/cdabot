const { prefix } = require('../config/config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'eval',
	description: 'Executes a JavaScript code, can be helpful for single-use things.',
	perms: [ 'ADMINISTRATOR' ],
	execute(message) {
		const content = message.content.slice(prefix.length + 5,);
		try {
			eval(content);
			message.channel.send({ content: `> **Successfully executed code**\n\`\`\`js\n${content}\n\`\`\`` })
				.then(sentMsg => setTimeout(() => sentMsg.delete(), 5000));
		} catch (error) {
			message.channel.send({ content: `> **There was an error executing code**\n\`\`\`js\n${content}\n\`\`\`\`\`\`${error}\`\`\``})
				.then(sentMsg => setTimeout(() => sentMsg.delete(), 5000));
		}
		message.delete();
	}
}