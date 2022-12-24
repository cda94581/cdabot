import { client } from '../index.js';

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
	const command = client.commands.get(commandName);
	if (!command) return await interaction.deferReply();

	try { command.execute(interaction); }
	catch (error) {
		console.error(error);
		return await interaction.reply({
			content: 'There was an error trying to execute that command',
			allowedMentions: { repliedUser: false }
		});
	}
});