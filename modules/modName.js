import { client } from '../index.js';
import { client } from '../index.js';
import bannedwords from '../config/bannedwords.json' assert { type: 'json' };

client.on('guildMemberAdd', async member => {
	if (member.id != member.guild.ownerID && bannedwords.some(phrase => member.displayName.toLowerCase().includes(phrase))) await member.setNickname( 'Name', 'Inappropriate Name' );
});