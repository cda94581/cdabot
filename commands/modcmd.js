const Discord = require('discord.js');
const fs = require('fs');
const { prefix, embedcolors } = require('../config/config.json');

let modcmds = new Discord.Collection();
let modcmdFiles = fs.readdirSync('./commands/modcmd').filter(file => file.endsWith('.js'));

for (const file of modcmdFiles) {
	const modcmd = require(`./modcmd/${file}`);
	modcmds.set(modcmd.name, modcmd);
}

module.exports = {
	name: 'modcmd',
	description: 'Commands for moderators and stuff',
	usage: '[help|modcmd name]',
	modcmds: modcmds,
	execute(message, args) {
		if (!args.length) return message.channel.send({ embeds: [{
			color: embedcolors.log,
			title: 'Mod Commands',
			description: 'These are commands for people with certain permissions. Use the `modcmd help` command to get a list of all commands. Use `modcmd [modcmd name]` (without brackets) to use the command.'
		}]});

		const modcmdArgs = message.content.slice(prefix.length).trim().split(/ +/);
		modcmdArgs.shift();
		const modcmdName = modcmdArgs.shift().toLowerCase();

		const modcmd = modcmds.get(modcmdName);
		if (!modcmd) return;

		if (modcmd.perms) for (perm of modcmd.perms) if (!message.member.permissions.has(eval(`Discord.Permissions.FLAGS.${perm}`)))
			return message.channel.send({ content: 'You don\'t have the permission to use this command' });

		try { modcmd.execute(message, modcmdArgs); }
		catch (error) {
			console.error(error);
			message.channel.send({ content: 'There was an error trying to execute that Mod Command' });
		}
	}
}