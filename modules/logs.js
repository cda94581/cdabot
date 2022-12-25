import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors, logchannel } = config;

const log = (message, files) => client.channels.cache.get(logchannel).send({ embeds: [ Object.assign({ color: embedcolors.log }, message) ], files: files });

client.on('guildBanAdd', ban => {
	const desc = `${ban.user} - ${ban.user.tag}\n**ID**: ${ban.user.id}`;
	log({
		title: 'Member Banned',
		description: desc,
		timestamp: new Date().toISOString()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Banned')}: ${desc}`);
});

client.on('guildBanRemove', ban => {
	const desc = `${ban.user} - ${ban.user.tag}\n**ID**: ${ban.user.id}`;
	log({
		title: 'Member Banned',
		description: desc,
		timestamp: new Date().toISOString()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Banned')}: ${desc}`);
});

client.on('guildMemberAdd', async member => {
	const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.id}\n**Account Created**: ${member.user.createdAt}`;

	const filePath = path.resolve(__dirname, '../_data/member_history.json');
	let memberhistory = fs.existsSync(filePath) ? (await import(filePath, { assert: { type: 'json' }})).default : [];
	if (memberhistory.includes(member.id)) {
		log({
			title: 'Member Rejoined',
			description: desc,
			timestamp: new Date().toISOString()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Rejoined')}: ${desc}`);
	} else {
		log({
			title: 'Member Joined',
			description: desc,
			timestamp: new Date().toISOString()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Joined')}: ${desc}`);

		memberhistory.push(member.id);
		fs.writeFileSync(filePath, JSON.stringify(memberhistory, null, '\t'));
	}
});

client.on('guildMemberRemove', async member => {
	if (member.partial) {
		try { await member.fetch(); }
		catch (error) { log({
			title: 'Member Left',
			description: 'Unable to fetch data',
			timestamp: new Date().toISOString()
		}); return console.error(error); }
	}

	const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.user.id}`;

	log({
		title: 'Member Left',
		description: desc,
		timestamp: new Date().toISOString()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Left')}: ${desc}`);
});

client.on('messageDelete', message => {
	if (message.partial) return;

	const desc = message.content;
	const attachments = message.attachments.map(m => m.url);

	log({
		title: `Message by ${message.author.tag} Deleted in #${message.channel.name}`,
		description: desc,
		timestamp: new Date().toISOString()
	}, attachments);
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Message by')} ${chalk.underline(message.author.tag)} ${chalk.italic('Deleted in')} ${chalk.underline(`#${message.channel.name}`)}:\n${desc}\n${chalk.italic('Attachments')}:\n${message.attachments.map(m => m.name).join('\n')}`);

	// To Do: Before/After Messages
});

client.on('messageDeleteBulk', messages => {
	const data = messages.map(m => m);
	const authors = messages.map(m => m.author).reverse();
	const content = messages.map(m => m.content).reverse();
	let desc = [ '' ];
	data.forEach((d, i) => desc[0] += `[${authors[i]}] ${content[i]}\n`);
	for (const i in desc) {
		if (desc[i].length > 2000) {
			const tempData = desc[i];
			desc[i] = tempData.slice(0, 2000);
			desc.push(tempData.slice(2000));
		}

		log({
			title: `Bulk Messages Deleted in #${data[0].channel.name}`,
			description: desc[i],
			timestamp: new Date().toISOString()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Bulk Messages Deleted in')} ${chalk.underline(`#${data[0].channel.name}`)}:${desc[i]}`);
	}
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
	if (oldMessage.partial) {
		try { await oldMessage.fetch(); }
		catch (error) { return console.error('Something went wrong: ', error); }
	}

	if (oldMessage.content == newMessage.content) return;
	let desc = [ `**Old**:\n${oldMessage.content}\n\n**New**:\n${newMessage.content}\n\n[Jump](${newMessage.url})` ];
	for (const i in desc) {
		if (desc[i].length > 2000) {
			const tempData = desc[i];
			desc[i] = tempData.slice(0, 2000);
			desc.push(tempData.slice(2000));
		}

		log({
			title: `Message Updated in #${oldMessage.channel.name}`,
			description: desc[i],
			timestamp: new Date().toISOString()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Message Updated in')} ${chalk.underline(`#${oldMessage.channel.name}`)}:\n${desc[i]}`);
	}
});

client.once('ready', () => console.log(`${chalk.bold(Date().toString())} Ready!`));

client.on('userUpdate', async (oldUser, newUser) => {
	if (oldUser.partial) {
		try { await oldUser.fetch(); }
		catch { return console.error(error); }
	}

	let desc = '';
	if (oldUser.discriminator != newUser.discriminator) desc += `\n**Discriminator Changed** - \`Old\`: ${oldUser.discriminator} \`New\`: ${newUser.discriminator}`;
	if (oldUser.username != newUser.username) desc += `\n**Username Changed** - \`Old\`: ${oldUser.username} \`New\`: ${newUser.username}`
	if (!desc.length) return;
	desc = `${oldUser}${desc}`;

	log({
		title: `User Updated: ${oldUser.tag}`,
		description: desc,
		thumbnail: { url: newUser.displayAvatarURL({ format: 'png', dynamic: true }) },
		timestamp: new Date().toISOString()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Updated:')} ${chalk.underline(oldUser.tag)}:\n${desc}\n`);
});