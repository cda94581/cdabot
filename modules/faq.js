import { client } from '../index.js';
import faqList from '../config/faq.json' assert { type: 'json' };

client.on('interactionCreate', async interaction => {
	if (!interaction.isAutocomplete() || interaction.commandName != 'faq') return;
	const focused = interaction.options.getFocused();
	const choices = faqList.map(f => f.name).filter(choice => choice.startsWith(focused));
	await interaction.respond(choices.map(choice => ({ name: choice, value: choice })));
});