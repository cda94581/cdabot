import fs from 'fs';
import { Client, Collection, Partials } from 'discord.js';
import event from 'events';
import config from './config/config.json' assert { type: 'json' };
const { token } = config;
const client = new Client({
	partials: [ Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User ],
	intents: [ 'DirectMessages', 'DirectMessageReactions', 'Guilds', 'GuildBans', 'GuildMembers', 'GuildMessages', 'GuildMessageReactions', 'GuildPresences', 'MessageContent' ]
});

client.customEvents = new event();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const { command } = await import(`./commands/${file}`);
	client.commands.set(command.name, command);
}

import './modules.js';

client.login(token);

export { client };