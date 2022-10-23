const { embedcolors } = require('../config/config.json');
const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'rank',
	description: 'Checks your level on the cdaBot leveling system',
	execute(message, args) {
		const author = args[0] || message.author.id;
		const filePath = path.resolve(__dirname, `../_data/leveling/${author}.json`);
		if (!fs.existsSync(filePath)) return message.channel.send({ content: 'You aren\'t ranked yet, send some messages to gain XP.' });
		const info = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		const toLevelUp = 5 * (info.level ** 2) + 50 * info.level + 100;
		message.channel.send({ embeds: [{
			color: embedcolors.command,
			title: `cdaBot Leveling - ${message.guild.members.cache.find(m => m.id == author).displayName}`,
			description: `**Level**: ${info.level}\n**XP**: ${info.xp}/${toLevelUp}\n**Messages**: ${info.messages}`
		}]});
	}
}