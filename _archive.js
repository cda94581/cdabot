import archiver from 'archiver';
import fs from 'fs';
const output = fs.createWriteStream('./cdabot.zip', 'utf-8');
const archive = archiver('zip', { zlib: { level: 9 }});

const files = fs.readdirSync('.', 'utf-8').filter(f => !['_archive.js','.git','cdabot.zip','node_modules'].includes(f));

files.forEach(f => {
	if (fs.statSync(f).isDirectory()) archive.directory(f, f);
	else archive.file(f, { name: f });
});

archive.pipe(output);
archive.finalize();
