const { embedcolors } = require('../config/config.json');

module.exports = messages => {
	const data = messages.map(m => m);
	const authors = messages.map(m => m.author).reverse();
	const content = messages.map(m => m.content).reverse();
	let desc = [ '' ];
	data.forEach((d, i) => desc[0] += `[${authors[i]}] ${content[i]}\n`);
	for (i = 0; i < desc.length; i++) {
		if (desc[i].length > 2000) {
			const tempData = desc[i];
			desc[i] = tempData.slice(0, 2000);
			desc.push(tempData.slice(2000));
		}

		require('./index').log({
			color: embedcolors.log,
			title: `Bulk Messages Deleted in #${data[0].channel.name}`,
			description: desc[i],
			timestamp: Date.now()
		});
		console.log(`\x1B[1m${Date().toString()} \x1B[3mBulk Messages Deleted in \x1B[4m#${data[0].channel.name}\x1B[0m:${desc[i]}`);
	}
}