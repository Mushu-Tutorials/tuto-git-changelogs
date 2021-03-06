const child = require('child_process');
const fs = require('fs');

/** Update the URL of the project */
const gitProject = 'https://github.com/Mushu-Tutorials/tuto-git-changelogs/';

const latestTag = child
  .execSync('git describe --long')
  .toString('utf-8')
  .split('-')[0];
const output = child
  .execSync(`git log ${latestTag}..HEAD --format=%B%H----DELIMITER----`)
  .toString('utf-8');

const commitsArray = output
  .split('----DELIMITER----\n')
  .map((commit) => {
    const [message, sha] = commit.split('\n');

    return { sha, message };
  })
  .filter((commit) => Boolean(commit.sha));

// Write in the CHANGELOG.md file
const currentChangelog = fs.readFileSync('./CHANGELOG.md', 'utf-8');

/**
 * Modify package.json version
 */
// Update the package.json file version with Dot (last element)
const currentVersion = require('./package.json').version;
// Convert each versions into an array (.split) and convert string to int with a function
const arrayOfVersions = currentVersion.split('.').map((x) => parseInt(x, 10));

// Change Feature version in the new array
const arrayOfNewVersions = arrayOfVersions;
const newIncrementVersion =
  Number(arrayOfNewVersions[arrayOfNewVersions.length - 1]) + 1;
arrayOfNewVersions[arrayOfNewVersions.length - 1] = newIncrementVersion;
const newVersion = arrayOfNewVersions.join('.');

// Update the package.json file version with Int Number
// const currentVersion = Number(require('./package.json').version);
// const newVersion = currentVersion + 1;

let newChangelog = `# Version ${newVersion} (${
  new Date().toISOString().split('T')[0]
})\n\n`;

const features = [];
const chores = [];
const hotfix = [];

commitsArray.forEach((commit) => {
  if (commit.message.startsWith('feature: ')) {
    features.push(
      `* ${commit.message.replace('feature: ', '')} ([${commit.sha.substring(
        0,
        6
      )}](${gitProject}${commit.sha}))\n`
    );
  }
  if (commit.message.startsWith('chore: ')) {
    chores.push(
      `* ${commit.message.replace('chore: ', '')} ([${commit.sha.substring(
        0,
        6
      )}](${gitProject}${commit.sha}))\n`
    );
  }
  if (commit.message.startsWith('hotfix: ')) {
    hotfix.push(
      `* ${commit.message.replace('hotfix: ', '')} ([${commit.sha.substring(
        0,
        6
      )}](${gitProject}${commit.sha}))\n`
    );
  }
});

if (features.length) {
  newChangelog += `## Features\n`;
  features.forEach((feature) => {
    newChangelog += feature;
  });
  newChangelog += '\n';
}

if (chores.length) {
  newChangelog += `## Chores\n`;
  chores.forEach((chore) => {
    newChangelog += chore;
  });
  newChangelog += '\n';
}

if (hotfix.length) {
  newChangelog += `## Hotfix\n`;
  hotfix.forEach((fix) => {
    newChangelog += fix;
  });
  newChangelog += '\n';
}

// Prepend the newChangelog to the current one
fs.writeFileSync('./CHANGELOG.md', `${newChangelog}${currentChangelog}`);

// Update the package.json file
fs.writeFileSync(
  './package.json',
  JSON.stringify({ version: String(newVersion) }, null, 2)
);

// Create a new commit
child.execSync('git add .');
child.execSync(`git commit -m "chore: Bump to version ${newVersion}"`);
// Tag the commit
child.execSync(`git tag -a -m "Tag for version ${newVersion}" v${newVersion}`);
// Push the code and tags
child.execSync(`git push --tags`);