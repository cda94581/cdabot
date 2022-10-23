# cdabot
*cdabot* is a [*Discord*](https://discord.com) Bot for [my Discord Server](https://discord.gg/da32ASg). It features custom commands, welcome messages, and leveling without databases, with more to come!

## Installing & Running
### Ubuntu Command Line
1. Download node.js, and npm - `sudo apt install nodejs && sudo apt install npm`
	- You may need to update node.js if `node -v` returns anything less than v16 - `sudo npm cache clean -f && sudo npm i -g n && sudo n latest`
2. Download [`cdabot.zip`](./cdabot.zip) - `wget https://github.com/cda94581/cdabot/blob/main/cdabot.zip?raw=true`
3. **Unzip** the downloaded file - `unzip 'cdabot.zip?raw=true'`
	- You may need to install `unzip` - `sudo apt-get install unzip`
4. `cd` to the file path
5. Modify the [`config.json`](config/config.json) file to fit your needs - `nano config/config.json` to edit. To write, press `CTRL+O`, to close, press `CTRL+X`
6. Download the packages if you haven't already - `npm i`
7. Run `node .` or `npm run start`

### Windows 10
1. Download [Node.js](https://nodejs.org/) (v16 or higher) and install with **NPM**
2. Navigate to the [Downloads](../Downloads) folder
3. [Download `cdabot.zip`](./cdabot.zip?raw=true) by clicking the file, then **View Raw**
4. Unzip the file
5. Modify the [`config.json`](config/config.json) file to fit your needs
6. `cd` to the file path in **Command Prompt**
7. Download the packages if you haven't already - `npm i`
8. Run `node .` or `npm run start`

Packages required:
- discord.js
- fs-extra

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

## Version Milestones
- [ ] 0.5.0 - Moderation & Admin Complete
- [ ] 1.0.0 - Project Plans Complete