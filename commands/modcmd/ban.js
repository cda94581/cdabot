const { prefix } = require('../../config/config.json');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
	name: 'ban',
	description: 'Ban a member of the server for a specific reason',
	args: true,
	usage: '<MEMBERID> [REASON]',
	perms: [ 'BAN_MEMBERS' ],
	async execute (message, args) {
		const member = message.guild.members.cache.find(m => m.id == args[0]);
		if (!member) return message.channel.send({ content: 'This member doesn\'t exist on this guild.' });
		const reason = message.content.slice(`${prefix}modcmd ban ${args[0]} `.length);
		try {
			let dm = `You were banned on **${message.guild.name}**.`;
			if (reason) dm += `\nReason: ${reason}`;
			await member.user.send({ content: dm });
			member.ban({ reason: reason });
			message.channel.send({ content: 'Member banned.' });
		} catch {
			member.ban({ reason: reason });
			message.channel.send({ content: 'Member banned. I couldn\'t DM them.' });
		}

		const filePath = path.resolve(__dirname, `../../_data/modactions/bans/${args[0]}.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `[]`, 'utf-8');
		let file = require(filePath);
		file.push({ id: file.length + 1, timestamp: Date.now(), reason: reason });
		fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8');
	}
}