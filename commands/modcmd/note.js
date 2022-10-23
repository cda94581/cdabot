const { prefix, embedcolors } = require('../../config/config.json');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
	name: 'note',
	description: 'Add a note to a member of the server',
	args: true,
	usage: '<MEMBERID> [REASON]',
	perms: [ 'KICK_MEMBERS', 'BAN_MEMBERS' ],
	execute (message, args) {
		const member = message.guild.members.cache.find(m => m.id == args[0]);
		if (!member) return message.channel.send({ content: 'This member doesn\'t exist on this guild.' });
		const note = message.content.slice(`${prefix}modcmd note ${args[0]} `.length);

		const filePath = path.resolve(__dirname, `../../_data/modactions/notes/${args[0]}.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `[]`, 'utf-8');
		let file = require(filePath);
		file.push({ id: file.length + 1, timestamp: Date.now(), note: note });
		fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8');
		message.channel.send({ content: `Successfully wrote a note for ${member.user.tag} (ID: ${file.length})` });

		const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.id}\n**Note**: ${note}\n**Note ID**: ${file.length}`;
		require('../../events/index').log({
			color: embedcolors.log,
			title: 'Member Note Added',
			description: desc,
			timestamp: Date.now()
		});
		console.log(`\x1B[1m${Date().toString()} \x1B[3mMember Note Added\x1B[0m: ${desc}`);
	}
}