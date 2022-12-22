const { embedcolors } = require('../config/config.json');
const bannedwords = require('../config/bannedwords.json');

module.exports = async (oldMessage, newMessage) => {
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

		require('./index').log({
			color: embedcolors.log,
			title: `Message Updated in #${oldMessage.channel.name}`,
			description: desc[i],
			timestamp: Date.now()
		});
		console.log(`\x1B[1m${Date().toString()} \x1B[3mMessage Updated in \x1B[4m#${oldMessage.channel.name}\x1B[0m:\n${desc[i]}`);
	}
}