const { modmessagingchannel } = require('../../config/config.json');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
	name: 'opendm',
	description: 'Opens a Moderator Chat section with the a user.',
	usage: '<id>',
	perms: [ 'BAN_MEMBERS', 'KICK_MEMBERS' ],
	args: true,
	// roles: [ 'Moderator', 'Helper' ],
	async execute(message, args) {
		const filePath = path.resolve(__dirname, `../../_data/mod_chat.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, '{}');
		let dataFile = JSON.parse(fs.readFileSync(filePath));

		const user = message.client.users.cache.get(args[0]);
		if (!user) return message.channel.send({ content: 'Could not find user.' });
		const channel = message.client.channels.cache.get(modmessagingchannel);
		const threadId = dataFile[args[0]];
		if (threadId) return message.channel.send({ content: `Thread already exists. <#${threadId}>` });
		
		channel.threads.create({ name: user.id }).then(t => {
			t.send({ content: `REFERENCE: Created on ${Date().toString()}\nUser: ${user} (**${user.tag}**)\n---` }).then(msg => msg.pin());
			dataFile[args[0]] = `${t.id}`;
			fs.writeFileSync(path.resolve(__dirname, '../../_data/mod_chat.json'), JSON.stringify(dataFile, null, '\t'), 'utf-8');
		});
	}
}