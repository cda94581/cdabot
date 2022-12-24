import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

const { logchannel } = require('../config/config.json');

const log = (message, files) => client.channels.cache.get(logchannel).send({ embeds: [ Object.assign({ color: embedcolors.log }, message) ], files: files })

client.on('guildBanAdd', ban => {
	const desc = `${ban.user} - ${ban.user.tag}\n**ID**: ${ban.user.id}`;
	log({
		title: 'Member Banned',
		description: desc,
		timestamp: Date.now()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Banned')}: ${desc}`);
});

client.on('guildBanRemove', ban => {
	const desc = `${ban.user} - ${ban.user.tag}\n**ID**: ${ban.user.id}`;
	log({
		title: 'Member Banned',
		description: desc,
		timestamp: Date.now()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Banned')}: ${desc}`);
});

client.on('guildMemberAdd', async member => {
	const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.id}\n**Account Created**: ${member.user.createdAt}`;

	const filePath = path.resolve(__dirname, '../_data/member_history.json');
	if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, '[]', 'utf-8');
	let memberhistory = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	if (memberhistory.includes(member.id)) {
		log({
			title: 'Member Rejoined',
			description: desc,
			timestamp: Date.now()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Rejoined')}: ${desc}`);
	} else {
		log({
			title: 'Member Joined',
			description: desc,
			timestamp: Date.now()
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
				timestamp: Date.now()
			}); return console.error(error); }
	}

	const desc = `${member.user} - ${member.user.tag}\n**ID**: ${member.user.id}`;

	log({
		title: 'Member Left',
		description: desc,
		timestamp: Date.now()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Left')}: ${desc}`);
})

// Message Delete
module.exports = message => {
	if (message.partial) return;

	const desc = message.content;
	const attachments = message.attachments.map(m => m.url);

	log({
		title: `Message by ${message.author.tag} Deleted in #${message.channel.name}`,
		description: desc,
		timestamp: Date.now()
	}, attachments);
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Message by')} ${chalk.underline(message.author.tag)} ${chalk.italic('Deleted in')} ${chalk.underline(`#${message.channel.name}`)}:\n${desc}\n${chalk.italic('Attachments')}:\n${message.attachments.map(m => m.name).join('\n')}`);

	// To Do: Before/After Messages
}

// Message Delete Bulk
module.exports = messages => {
	const data = messages.map(m => m);
	const authors = messages.map(m => m.author).reverse();
	const content = messages.map(m => m.content).reverse();
	let desc = [ '' ];
	data.forEach((d, i) => desc[0] += `[${authors[i]}] ${content[i]}\n`);
	for (i = 0; i < desc.length; i++) {
		if (desc[i].length > 2000) {
			const tempData = desc[i];
			desc[i] = tempData.slice(0, 2000);
			desc.push(tempData.slice(2000));
		}

		log({
			title: `Bulk Messages Deleted in #${data[0].channel.name}`,
			description: desc[i],
			timestamp: Date.now()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Bulk Messages Deleted in')} ${chalk.underline(`#${data[0].channel.name}`)}:${desc[i]}`);
	}
}

client.on('messageUpdate', async (oldMessage, newMessage) => {
	if (oldMessage.partial) {
		try { await oldMessage.fetch(); }
		catch (error) { return console.error('Something went wrong: ', error); }
	}

	if (newMessage.channel.type != 'DM' && newMessage.author.id != newMessage.guild.ownerId) {
		if (bannedwords.some(phrase => newMessage.content.toLowerCase().includes(phrase))) {
			newMessage.delete();
			newMessage.channel.send({ content: `${newMessage.author}, you aren't allowed to say this phrase.` })
				.then(sentMsg => setTimeout(() => sentMsg.delete(), 5000));
		}
	}

	if (oldMessage.content == newMessage.content) return;
	let desc = [ `**Old**:\n${oldMessage.content}\n\n**New**:\n${newMessage.content}\n\n[Jump](${newMessage.url})` ];
	for (i = 0; i < desc.length; i++) {
		if (desc[i].length > 2000) {
			const tempData = desc[i];
			desc[i] = tempData.slice(0, 2000);
			desc.push(tempData.slice(2000));
		}

		log({
			title: `Message Updated in #${oldMessage.channel.name}`,
			description: desc[i],
			timestamp: Date.now()
		});
		console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Message Updated in')} ${chalk.underline(`#${oldMessage.channel.name}`)}:\n${desc[i]}`);
	}
})

client.once('ready', () => console.log(`${chalk.bold(Date().toString())} Ready!`));

// User Update
module.exports = async (oldUser, newUser) => {
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
		timestamp: Date.now()
	});
	console.log(`${chalk.bold(Date().toString())} ${chalk.italic('Member Updated:')} ${chalk.underline(oldUser.tag)}:\n${desc}\n`);
}