import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const command = {
	name: 'eval',
	description: 'Evaluates a custom line of JavaScript',
	global: true,
	builder: new SlashCommandBuilder()
		.addStringOption((option) => option
			.setName('command')
			.setDescription('The command to execute')
			.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: async (interaction = ChatInputCommandInteraction.prototype) => {
		const command = interaction.options.getString('command');
		try {
			eval(command);
			await interaction.reply({
				content: `> **Successfully executed code**\n\`\`\`js\n${command}\n\`\`\``
			});
		} catch (error) {
			await interaction.reply({
				content: `> **There was an error executing code**\n\`\`\`js\n${command}\n\`\`\`\`\`\`${error}\`\`\``
			});
		}
	}
}