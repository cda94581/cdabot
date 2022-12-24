import fs from 'fs';

const files = fs.readdirSync('./modules').filter(f => f.endsWith('.js'));
files.forEach(async file => await import(`./modules/${file}`));