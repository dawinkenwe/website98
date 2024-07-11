const { execSync } = require('child_process');
const fs = require('fs');
const { program } = require('commander');
const path = require('path');

program
	.requiredOption('-t, --type <type>', 'release type: [major, minor, patch]')
	.requiredOption('-n, --notes <type>', 'release notes')
	.option('-b, --bugs <type>', 'bug fixes')
	.option('-f, --features <type>', 'release features')

program.parse();

console.log(`type: ${program.opts().type}`);
console.log(`notes: ${program.opts().notes}`);
console.log(`bugs: ${program.opts().bugs}`);
console.log(`features: ${program.opts().features}`);
let committed = false;
let releaseNotesCreated = false;

try {
	// Adjust Version
	execSync(`npm version ${program.opts().type}`);

	// Create Release Notes
	const version = process.env.npm_package_version;
	console.log('version is now: ' + version);
	const releaseNotesMdFile = path.join(__dirname, 'public', 'releaseNotes', version + '.md')
	console.log('creating release notes file: ' + releaseNotesMdFile);
	let contents = "Version: " + version + '\r\n\r\n';
	contents += '## Notes\r\n';
	contents += program.opts().notes;
	contents += '\r\n\r\n';
	if (program.opts().features) {
		contents += '## Features\r\n';
		const features = program.opts().features.split(',');
		for (var i = 0; i < features.length; i++) {
			contents += '- ' + features[i] + '\r\n';
		}
		contents += '\r\n'
	}
	if (program.opts().bugs) {
		contents += '## Bugs\r\n';
		const bugs = program.opts().bugs.split(',');
		for (var i = 0; i < bugs.length; i++) {
			contents += '- ' + bugs[i] + '\r\n';
		}
	}

	console.log(contents);

	// Build project
	// execSync('npm run build');

	// Commit the changes

	// committed = true;

	// Do the deploy


} catch (error) {
	console.log(error);

	console.error('Build or deploy failed, reverting version change.');
	// execSync('git reset --hard HEAD~1');
	process.exit(1);
}