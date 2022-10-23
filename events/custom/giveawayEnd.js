module.exports = async message => {
	await message.reactions.cache.find(r => r.emoji.name == '🎉').users.fetch();
	const reactors = message.reactions.cache.find(r => r.emoji.name == '🎉').users.cache.map(u => u.id).filter(msg => msg != message.client.user.id);
	const winner = message.client.users.cache.get(reactors[Math.floor(Math.random() * reactors.length)]);
	message.channel.send({ content: `Congratulations to ${winner} for winning the giveaway!` });
	message.edit({ embeds: [{ color: 'BLURPLE', title: message.embeds[0].title, description: `> **Giveaway!**\n**Ended**: <t:${message.ends}:R>\n**Winner**: ${winner}` }]});
}