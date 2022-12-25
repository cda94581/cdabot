# cdabot
Version 0.4.6

*cdabot* is a [*Discord*](https://discord.com) Bot for [my Discord Server](https://discord.gg/da32ASg). It features custom commands, welcome messages, and leveling without databases, with more to come!

A quick note- I've set all "stable" commands to have the "global" flag. This may not necessarily be the most secure practice if running for multiple servers and you'll have to modify this.

## Installing & Running
1. Download [Node.js](https://nodejs.org/) (v16 or higher) and NPM
2. Download the [`source code`](https://github.com/cda94581/stiadsbot/tags) from the tags
3. Unzip the file
4. Modify the [`config.json`](config.json) file to fit your needs
5. Open the folder in the Command Prompt or Terminal
6. Download the packages with `npm i`
7. Run with `node .` or `npm run start`
	- You may need to register slash commands with `npm run register`
	- Scripts are also available to delete the slash commands
	- All scripts: `start`, `dev`, `build`, `register`, `deleteServer`, `deleteGlobal`

Packages required:
- @discordjs/rest
- chalk
- discord.js
- fs-extra
- lodash
- xml2js

## Contributing
Contributions are welcome, and they're fairly simple, however it is beyond the scope of a README file to explain in detail. In general however, look up information as needed:
- Fork the Repository
- Clone the Fork
- Make Changes & Commit
	- Write Proper Commit Messages!
- Create a Pull Request to merge with the main branch
	- Make it Detailed!

## Project Plans
### General
- [x] Basic Outline
- [x] Welcome Messages
- [x] Welcome Back Messages
- [x] Command Handler
- [x] FAQ Command Handler
- [x] Trigger Handler
- [x] No Database Leveling
- [x] YouTube Notifications
- [ ] Giveaway System
- [ ] Automatically re-add status if it resets
- [ ] Config Validation

### Moderation
- [x] Moderator Command Handler
- [ ] Link Filtering
- [ ] Leave/Rejoin Notifications for Moderators
- [ ] Event Responses
- [ ] Logging
- [x] Ban
- [x] Kick
- [ ] Mute
- [x] Warn
- [x] Note
- [ ] Easy Notifications & Responses (Reactions)
- [x] Reaction Roles
- [ ] No Welcoming for Certain Reasons
- [x] Automatic Nicknames for Inappropriate Names

### Commands to Add
#### Moderators
- [x] Purge
- [x] Slowmode
- [x] Ban
- [x] Kick
- [ ] Mute
- [x] Warn
- [x] Note
- [ ] Notify Join

#### Admin
- [ ] Blacklist XP
- [ ] Add XP
- [ ] Remove XP
- [ ] Set XP

### Logging to Add
- [ ] Make Logging Cleaner

#### Server Events
- [ ] Channel Creation
- [ ] Updated Channel
- [ ] Channel Deletion
- [ ] Role Creaiton
- [ ] Role Updates
- [ ] Role Deletion
- [ ] Server Updates
- [ ] Emoji Changes

#### Member Events
- [x] Role Updates
- [x] Name Changes
- [x] Avatar Changes
- [x] Member Bans
- [x] Member Unbans

#### Voice Events
- [ ] Join Voice Channel
- [ ] Move Between Voice Channels
- [ ] Leave Voice Channel

#### Message Events
- [x] Deleted Messages
- [x] Edited Messages
- [x] Purged Messages
- [x] Discord Invites/Banned Words

#### Members Joining and Leaving
- [x] Members Joining
- [x] Members Leaving