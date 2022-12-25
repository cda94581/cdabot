import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

const log = (message, files) => client.channels.cache.get(logchannel).send({ embeds: [ Object.assign({ color: embedcolors.log }, message) ], files: files });

export const command = {
	name: 'modcmd',
	description: 'Commands for moderators and stuff',
	global: true,
	builder: new SlashCommandBuilder()
		.addSubcommand((option) => option
			.setName('actions')
			.setDescription('Gets actions on a user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user to get the action of')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('type')
				.setDescription('[OPTIONAL] A specific type of action')
				.setChoices(
					{ name: 'ban', value: 'ban' },
					{ name: 'kick', value: 'kick' },
					{ name: 'mute', value: 'mute' },
					{ name: 'note', value: 'note' },
					{ name: 'warn', value: 'warn' }
				)
			)
		)
		.addSubcommand((option) => option
			.setName('ban')
			.setDescription('Bans a user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user to ban')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('reason')
				.setDescription('[OPTIONAL] The reason for the ban')
			)
		)
		.addSubcommand((option) => option
			.setName('kick')
			.setDescription('Kicks a user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user to kick')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('reason')
				.setDescription('[OPTIONAL] The reason for the kick')
			)
		)
		.addSubcommand((option) => option
			.setName('note')
			.setDescription('Adds a note to a user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user to add a note to')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('note')
				.setDescription('The note')
				.setRequired(true)
			)
		)
		.addSubcommand((option) => option
			.setName('purge')
			.setDescription('Purges a channel')
			.addChannelOption((option) => option
				.setName('channel')
				.setDescription('The channel to purge')
				.setRequired(true)
			)
			.addIntegerOption((option) => option
				.setName('amount')
				.setDescription('The amount of messages to delete')
				.setMinValue(1)
				.setMaxValue(100)
				.setRequired(true)
			)
		)
		.addSubcommand((option) => option
			.setName('slowmode')
			.setDescription('Sets a slowmode to a channel')
			.addChannelOption((option) => option
				.setName('channel')
				.setDescription('The channel to add the slowmode to')
				.setRequired(true)
			)
			.addIntegerOption((option) => option
				.setName('duration')
				.setDescription('The length of the slowmode (seconds)')
				.setRequired(true)
			)
		)
		.addSubcommand((option) => option
			.setName('warn')
			.setDescription('Warns a user')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('The user to warn')
				.setRequired(true)
			)
			.addStringOption((option) => option
				.setName('reason')
				.setDescription('[OPTIONAL] The reason for the warn')
			)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		const subCommand = interaction.options.getSubcommand();
		command[subCommand](interaction);
	},
	actions: async (interaction = ChatInputCommandInteraction.prototype) => {
		const user = interaction.options.getUser('user');
		let notes = ''; const notePath = path.resolve(__dirname, `../../_data/modactions/notes/${user.id}.json`);
		let warns = ''; const warnPath = path.resolve(__dirname, `../../_data/modactions/warns/${user.id}.json`);
		// let mutes = ''; const mutePath = path.resolve(__dirname, `../../_data/modactions/mutes/${user.id}.json`);
		let kicks = ''; const kickPath = path.resolve(__dirname, `../../_data/modactions/kicks/${user.id}.json`);
		let bans = ''; const banPath = path.resolve(__dirname, `../../_data/modactions/bans/${user.id}.json`);
		if (!fs.existsSync(notePath)) notes = '\nThere aren\'t any notes for this user.\n'; else {
			const temp = (await import(notePath, { assert: { type: 'json' }})).default;
			for ( i of temp ) notes += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Note**: ${i.note}\n`;
		}
		if (!fs.existsSync(warnPath)) warns = '\nThere aren\'t any warnings for this user.\n'; else {
			const temp = (await import(warnPath, { assert: { type: 'json' }})).default;
			for ( i of temp ) warns += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Reason**: ${i.reason}\n`;
		}
		// Mutes here...
		if (!fs.existsSync(kickPath)) kicks = '\nThere aren\'t any kicks for this user.\n'; else {
			const temp = (await import(kickpath, { assert: { type: 'json' }})).default;
			for ( i of temp ) kicks += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Reason**: ${i.reason}\n`;
		}
		if (!fs.existsSync(banPath)) bans = '\nThere aren\'t any bans for this user.\n'; else {
			const temp = (await import(banPath, { assert: { type: 'json' }})).default;
			for ( i of temp ) bans += `\n**ID**: ${i.id}\n**Timestamp**: <t:${Math.round(i.timestamp / 1000)}> (<t:${Math.round(i.timestamp / 1000)}:R>)\n**Reason**: ${i.reason}\n`;
		}

		let data = [ `${user}\n` ];
		switch(interaction.options.getString('type')) {
			case 'note': data[0] += `> **Notes**:${notes}`; break;
			case 'warn': data[0] += `> **Warnings**:${warns}`; break;
			case 'mute': data[0] += `> **Mutes**: WIP`; break;
			case 'kick': data[0] += `> **Kicks**:${kicks}`; break;
			case 'ban': data[0] += `> **Bans**:${bans}`; break;
			default: data[0] += `> **Notes**:${notes}\n> **Warnings**:${warns}\n> **Mutes**: WIP\n\n> **Kicks**:${kicks}\n> **Bans**:${bans}`; break;
		}

		for (const i in data) {
			if (data[i].length > 2000) { // If past character limit
				const tempData = data[i];
				data[i] = tempData.slice(0, 2000);
				data.push(tempData.slice(2000));
			}
			await interaction.reply({ embeds: [{
				color: embedcolors.log,
				title: 'Moderator Actions',
				description: data[i]
			}]});
		}
	},
	ban: async (interaction = ChatInputCommandInteraction.prototype) => {
		const member = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		try {
			let dm = `You were banned on **${interaction.guild.name}**.`;
			if (reason) dm += `\nReason: ${reason}`;
			await member.user.send({ content: dm });
			await member.ban({ reason });
			await interaction.reply({ content: 'Member banned.' });
		} catch {
			await member.ban({ reason });
			await interaction.reply({ content: 'Member banned. I couldn\'t DM them.' });
		}

		const filePath = path.resolve(__dirname, `../../_data/modactions/bans/${member.id}.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `[]`, 'utf-8');
		let file = (await import(filePath, { assert: { type: 'json' }})).default;
		file.push({ id: file.length + 1, timestamp: new Date().toISOString(), reason: reason });
		fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8');
	},
	kick: async (interaction = ChatInputCommandInteraction.prototype) => {
		const member = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		try {
			let dm = `You were kicked from **${interaction.guild.name}**.`;
			if (reason) dm += `\nReason: ${reason}`;
			await member.user.send({ content: dm });
			await member.kick(reason);
			await interaction.reply({ content: 'Member kicked.' });
		} catch {
			await member.kick(reason);
			await interaction.reply({ content: 'Member kicked. I couldn\'t DM them.' });
		}

		const filePath = path.resolve(__dirname, `../../_data/modactions/kicks/${member.id}.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `[]`, 'utf-8');
		let file = (await import(filePath, { assert: { type: 'json' }})).default;
		file.push({ id: file.length + 1, timestamp: new Date().toISOString(), reason: reason });
		fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8');

		const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.id}\n**Reason**: ${reason}\n**Kick ID**: ${file.length}`;
		log({
			color: embedcolors.log,
			title: 'Member Kicked',
			description: desc,
			timestamp: new Date().toISOString()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Kicked')}: ${desc}`);
	},
	note: async (interaction = ChatInputCommandInteraction.prototype) => {
		const user = interaction.options.getUser('user');
		const note = interaction.options.getString('note');

		const filePath = path.resolve(__dirname, `../../_data/modactions/notes/${args[0]}.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `[]`, 'utf-8');
		let file = (await import(filePath, { assert: { type: 'json' }})).default;
		file.push({ id: file.length + 1, timestamp: new Date().toISOString(), note });
		fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8');
		await interaction.reply({ content: `Successfully wrote a note for ${user.tag} (ID: ${file.length})` });

		const desc = `${user} - ${user.tag}\n**ID**: ${user.id}\n**Note**: ${note}\n**Note ID**: ${file.length}`;
		log({
			color: embedcolors.log,
			title: 'Member Note Added',
			description: desc,
			timestamp: new Date().toISOString()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Note Added')}: ${desc}`);
	},
	purge: async (interaction = ChatInputCommandInteraction.prototype) => {
		const channel = interaction.options.getChannel('channel');
		const amount = interaction.options.getInteger('amount');
		channel.bulkDelete(amount, true)
			.then(async () => await interaction.reply({ content: 'Purged messages', ephemeral: true }))
			.catch(async (error) => {
				console.error(error);
				await interaction.reply({ content: 'There was an error trying to purge messages in this channel!' })
			});
	},
	slowmode: async (interaction = ChatInputCommandInteraction.prototype) => {
		const channel = interaction.options.getChannel('channel');
		const duration = interaction.options.getInteger('duration');
		await channel.setRateLimitPerUser(duration);
		await interaction.reply({ content: `Slowmode set to ${args[0]} seconds.` });
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Slowmode of ${args[0]} seconds set for')} #${chalk.underline(channel.name)}`);
	},
	warn: async (interaction = ChatInputCommandInteraction.prototype) => {
		const member = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		try {
			let dm = `You were warned on **${message.guild.name}**.`;
			if (reason) dm += `\nReason: ${reason}`;
			await member.user.send({ content: dm });
			await interaction.reply({ content: 'Member warned.' });
		} catch { await interaction.reply({ content: 'Member warned. I couldn\'t DM them.' }); }

		const filePath = path.resolve(__dirname, `../../_data/modactions/warns/${member.id}.json`);
		if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `[]`, 'utf-8');
		let file = (await import(filePath, { assert: { type: 'json' }})).default;
		file.push({ id: file.length + 1, timestamp: new Date().toISOString(), reason: reason });
		fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8');

		const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.id}\n**Reason**: ${reason}\n**Warn ID**: ${file.length}`;
		log({
			color: embedcolors.log,
			title: 'Member Warned',
			description: desc,
			timestamp: new Date().toISOString()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Warned')}: ${desc}`);
	}
}