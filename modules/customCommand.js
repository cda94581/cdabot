import { client } from '../index.js';
import faqList from '../config/command.json' assert { type: 'json' };

client.on('interactionCreate', async interaction => {
	if (!interaction.isAutocomplete() || interaction.commandName != 'other') return;
	const focused = interaction.options.getFocused();
	const choices = faqList.map(f => f.name).filter(choice => choice.startsWith(focused));
	await interaction.respond(choices.map(choice => ({ name: choice, value: choice })));
});