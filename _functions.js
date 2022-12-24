
const log = (message, files) => client.channels.cache.get(logchannel).send({ embeds: [ message ], files: files })