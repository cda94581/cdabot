if (!(process.env.GITHUB_ENV && process.env.GITHUB_OUTPUT)) {
	console.error('This file is intended to be used by Github Actions only.');
	process.exit(1);
}

import fs from 'fs';
import pkg from './package.json' assert { type: 'json' };
let readme = fs.readFileSync('./README.md', 'utf-8').split('\n');

const date = new Date();
let version = `0.${date.getUTCFullYear()}.${date.getUTCMonth()+1}.${date.getUTCDate()}`;
let tweak = 1;
if (pkg.version.startsWith(version)) {
	const pkgTweak = parseInt(pkg.version.split('-')[1]);
	tweak += pkgTweak;
}
version += `-${tweak}`

pkg.version = version;
readme[1] = `Version ${version}`;

fs.writeFileSync('./package.json', JSON.stringify(pkg, null, '\t'), 'utf-8');
fs.writeFileSync('./README.md', readme.join('\n'), 'utf-8');

fs.writeFileSync(process.env.GITHUB_ENV, `VERSION=${version}`, 'utf-8');
fs.writeFileSync(process.env.GITHUB_OUTPUT, `VERSION=${version}`, 'utf-8');