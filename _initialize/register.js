import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import fs from 'fs';
import lodash from 'lodash';
import config from '../config.json' assert { type: 'json' };
const { clientId, guildId, token } = config;
let commandsServer = [];
let commandsGlobal = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const { command } = await import(`../commands/${file}`);
	let builder = new SlashCommandBuilder()
		.setName(command.name)
		.setDescription(command.description)
		.setDMPermission(command.dmEnabled ?? false);
	if (command.builder) lodash.merge(builder, command.builder);
	if (command.global) commandsGlobal.push(builder);
	else commandsServer.push(builder);
};
	
const rest = new REST({ version: 10 }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsServer })
	.then(() => console.log('Successfully registered server commands'))
	.catch(console.error);
rest.put(Routes.applicationCommands(clientId), { body: commandsGlobal })
	.then(() => console.log('Successfully registered global commands'))
	.catch(console.error);
