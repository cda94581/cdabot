const { embedcolors } = require('../../config/config.json');
const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'modactions',
	description: 'List all modactions on a user',
	args: true,
	usage: '<USER ID> [note|warn|mute|kick|ban]',
	perms: [ 'BAN_MEMBERS', 'KICK_MEMBERS' ],
	execute(message, args) {
		let notes = ''; const notePath = path.resolve(__dirname, `../../_data/modactions/notes/${args[0]}.json`);
		let warns = ''; const warnPath = path.resolve(__dirname, `../../_data/modactions/warns/${args[0]}.json`);
		// let mutes = ''; const mutePath = path.resolve(__dirname, `../../_data/modactions/mutes/${args[0]}.json`);
		let kicks = ''; const kickPath = path.resolve(__dirname, `../../_data/modactions/kicks/${args[0]}.json`);
		let bans = ''; const banPath = path.resolve(__dirname, `../../_data/modactions/bans/${args[0]}.json`);
		if (!fs.existsSync(notePath)) notes = '\nThere aren\'t any notes for this user.\n'; else {
			const temp = JSON.parse(fs.readFileSync(notePath, 'utf-8'));
			for ( i of temp ) notes += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Note**: ${i.note}\n`;
		}
		if (!fs.existsSync(warnPath)) warns = '\nThere aren\'t any warnings for this user.\n'; else {
			const temp = JSON.parse(fs.readFileSync(warnPath, 'utf-8'));
			for ( i of temp ) warns += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Reason**: ${i.reason}\n`;
		}
		// Mutes here...
		if (!fs.existsSync(kickPath)) kicks = '\nThere aren\'t any kicks for this user.\n'; else {
			const temp = JSON.parse(fs.readFileSync(kickPath, 'utf-8'));
			for ( i of temp ) kicks += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Reason**: ${i.reason}\n`;
		}
		if (!fs.existsSync(banPath)) bans = '\nThere aren\'t any bans for this user.\n'; else {
			const temp = JSON.parse(fs.readFileSync(banPath, 'utf-8'));
			for ( i of temp ) bans += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Reason**: ${i.reason}\n`;
		}

		let data = [ `<@!${args[0]}>\n` ];
		switch(args[1]) {
			case 'note': data[0] += `> **Notes**:${notes}`; break;
			case 'warn': data[0] += `> **Warnings**:${warns}`; break;
			case 'mute': data[0] += `> **Mutes**: WIP`; break;
			case 'kick': data[0] += `> **Kicks**:${kicks}`; break;
			case 'ban': data[0] += `> **Bans**:${bans}`; break;
			default: data[0] += `> **Notes**:${notes}\n> **Warnings**:${warns}\n> **Mutes**: WIP\n\n> **Kicks**:${kicks}\n> **Bans**:${bans}`; break;
		}

		for (i = 0; i < data.length; i++) {
			if (data[i].length > 2000) { // If past character limit
				const tempData = data[i];
				data[i] = tempData.slice(0, 2000);
				data.push(tempData.slice(2000));
			}
			message.channel.send({ embeds: [{
				color: embedcolors.log,
				title: 'Moderator Actions',
				description: data[i]
			}]});
		}
	}
}