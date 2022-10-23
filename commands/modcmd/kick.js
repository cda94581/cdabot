const { prefix, embedcolors } = require('../../config/config.json');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
	name: 'kick',
	description: 'Kicks a member from the server',
	args: true,
	usage: '<MEMBERID> [REASON]',
	perms: [ 'KICK_MEMBERS' ],
	async execute (message, args) {
		const member = message.guild.members.cache.find(m => m.id == args[0]);
		if (!member) return message.channel.send({ content: 'This member doesn\'t exist on this guild.' });
		const reason = message.content.slice(`${prefix}modcmd kick ${args[0]} `.length);
		try {
			let dm = `You were kicked from **${message.guild.name}**.`;
			if (reason) dm += `\nReason: ${reason}`;
			await member.user.send({ content: dm });
			member.kick(reason);
			message.channel.send({ content: 'Member kicked.' });
		} catch {
			member.kick(reason);
			message.channel.send({ content: 'Member kicked. I couldn\'t DM them.' });
		}

		const filePath = path.resolve(__dirname, `../../_data/modactions/kicks/${args[0]}.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `[]`, 'utf-8');
		let file = require(filePath);
		file.push({ id: file.length + 1, timestamp: Date.now(), reason: reason });
		fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8');

		const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.id}\n**Reason**: ${reason}\n**Kick ID**: ${file.length}`;
		require('../../events/index').log({
			color: embedcolors.log,
			title: 'Member Kicked',
			description: desc,
			timestamp: Date.now()
		});
		console.log(`\x1B[1m${Date().toString()} \x1B[3mMember Kicked\x1B[0m: ${desc}`);
	}
}