import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import config from '../config.json' assert { type: 'json' };
const { clientId, guildId, token } = config;

const rest = new REST({ version: 10 }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId))
	.then(data => {
		const promises = [];
		for (const command of data) {
			const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
			promises.push(rest.delete(deleteUrl));
		}
		return Promise.all(promises);
	})
	.then(() => console.log('Successfully deleted commands'))
	.catch(console.error);