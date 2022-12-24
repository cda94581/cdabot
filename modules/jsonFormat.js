import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
import { client } from '../index.js';
import { log } from '../_functions.js';
import config from '../config/config.json' assert { type: 'json' };
const { embedcolors } = config;

let data = null;
let text = message.content;
try { data = JSON.parse('{' + text + '}'); } catch {}
try { data = JSON.parse('[' + text + ']'); } catch {}
try { data = JSON.parse(text); } catch {}
if (data && text.length > 60) message.channel.send({ content: `Hey, ${message.member.displayName}, I've formatted the JSON for you!\n\`\`\`json\n${JSON.stringify(data, null, '\t')}\`\`\`` });