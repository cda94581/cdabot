import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import config from '../config/config.json' assert { type: 'json' };
const { clientId, token } = config;

const rest = new REST({ version: 10 }).setToken(token);
rest.get(Routes.applicationCommands(clientId))
	.then(data => {
		const promises = [];
		for (const command of data) {
			const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
			promises.push(rest.delete(deleteUrl));
		}
		return Promise.all(promises);
	})
	.then(() => console.log('Successfully deleted commands'))
	.catch(console.error);