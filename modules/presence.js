import { client } from '../index.js';
import config from '../config/config.json' assert { type: 'json' };
const { presence } = config;
const { activities, status } = presence;

const setPresence = async () => {
	client.user.setPresence({ activities, status });
	setTimeout(setPresence, 3600000);
}

client.once('ready', setPresence);