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
let releaseNotesFile = '';

try {
	// Adjust Version
	execSync(`npm version ${program.opts().type}`);

	// Create Release Notes
	const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
	const version = packageJson.version;
	console.log('version is now: ' + version);
	const releaseNotesMdFile = path.join(__dirname, 'public', 'releaseNotes', version + '.md')
	console.log('creating release notes file: ' + releaseNotesMdFile);
	let contents = "# Version: " + version + '\r\n\r\n';
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

	fs.writeFileSync(releaseNotesMdFile, contents, "utf8");

	console.log(contents);

	// Build project
	execSync('npm run build');

	// Commit the changes
	execSync('git add .');
	execSync(`git commit -m "commit for release ${version}"`);
	execSync('git push');
	committed = true;

	// Deploy to github Pages
	execSync('npm run deploy');

} catch (error) {
	console.log(error);
	console.error('Encountered Error in release process.');
	if (committed) {
		console.error('Build or deploy failed, reverting version change.');
		execSync('git reset --hard HEAD~1');
	}

	process.exit(1);
}