const { prefix, embedcolors } = require('../config/config.json');
const faqList = require('../config/faq.json');

module.exports = {
	name: 'faq',
	description: 'Common issues and things to know',
	usage: '[list|faq name]',
	execute(message, args) {
		if (!args.length) return message.channel.send({ embeds: [{
			color: embedcolors.faq,
			title: 'FAQ',
			description: 'These are some handy things to know! Use the `faq list` command to get a list of all queries. Use `faq [faq name]` (without brackets) to use the command'
		}]});

		const faqArgs = message.content.slice(prefix.length).trim().split(/ +/);
		faqArgs.shift();
		const faqName = faqArgs.shift().toLowerCase();

		const faq = faqList.find(f => f.name.toLowerCase() == faqName);
		if (faq) {
			const embeds = faq.embeds.map(embed => { return { color: embedcolors.faq, title: embed.title, description: embed.description } });
			return message.channel.send({ embeds: embeds });
		}

		if (faqName == 'list') {
			const data = faqList.map(faq => faq.name).join('`, `');
			message.channel.send({ embeds: [{
				color: embedcolors.faq,
				title: 'cdaBot FAQ List',
				description: `\`${data}\``
			}]});
		}
	}
}