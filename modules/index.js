const guildBanAdd = require('./guildBanAdd');
const guildBanRemove = require('./guildBanRemove');
const guildMemberAdd = require('./guildMemberAdd');
const guildMemberRemove = require('./guildMemberRemove');
const guildMemberUpdate = require('./guildMemberUpdate');
const messageCreate = require('./messageCreate');
const messageDelete = require('./messageDelete');
const messageDeleteBulk = require('./messageDeleteBulk');
const messageReactionAdd = require('./messageReactionAdd');
const messageReactionRemove = require('./messageReactionRemove');
const messageUpdate = require('./messageUpdate');
const ready = require('./ready');
const userUpdate = require('./userUpdate');

const custom = {
	giveawayEnd: require('./custom/giveawayEnd')
}

const { logchannel } = require('../config/config.json');

let globalClient = null;

module.exports = {
	event(client) {
		globalClient = client;

		client.customEvents.on('giveawayEnd', message => custom.giveawayEnd(message));

		client.on('guildBanAdd', ban => guildBanAdd(ban));
		client.on('guildBanRemove', ban => guildBanRemove(ban));
		client.on('guildMemberAdd', member => guildMemberAdd(member));
		client.on('guildMemberRemove', member => guildMemberRemove(member));
		client.on('guildMemberUpdate', (oldMember, newMember) => guildMemberUpdate(oldMember, newMember));
		client.on('messageCreate', message => messageCreate(message));
		client.on('messageDelete', message => messageDelete(message));
		client.on('messageDeleteBulk', messages => messageDeleteBulk(messages));
		client.on('messageReactionAdd', (messageReaction, user) => messageReactionAdd(messageReaction, user));
		client.on('messageReactionRemove', (messageReaction, user) => messageReactionRemove(messageReaction, user));
		client.on('messageUpdate', (oldMessage, newMessage) => messageUpdate(oldMessage, newMessage));
		client.once('ready', () => ready(client));
		client.on('userUpdate', (oldUser, newUser) => userUpdate(oldUser, newUser));
	},
	log: (message, files) => globalClient.channels.cache.get(logchannel).send({ embeds: [ message ], files: files })
}