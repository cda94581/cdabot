const fs = require('fs'); // Loads node.js file system module
const Discord = require('discord.js'); // Requires discord.js module
const event = require('events');
const {	token } = require ('./config/config.json'); // Loads prefix and token from config file
const client = new Discord.Client({ partials: [ 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER' ], intents: [ Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_WEBHOOKS ]}); // Discord Client

client.customEvents = new event(); // Custom events
client.commands = new Discord.Collection(); // Collection for commands

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Adds all commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Run events
const events = require('./events/index'); events.event(client);

client.login(token); // Login