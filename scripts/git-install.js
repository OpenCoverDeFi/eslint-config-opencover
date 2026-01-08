// eslint-disable-next-line no-undef
const resolved = process.env.npm_package_resolved || '';

const isGitInstall = resolved.startsWith('git+') || resolved.includes('github.com') || resolved.includes('gitlab.com');

if (!isGitInstall) {
    // eslint-disable-next-line no-undef
    process.exit(0);
}

// eslint-disable-next-line no-undef,no-console
console.log('Git install detected, running build...');
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
require('child_process').execSync('pnpm build', { stdio: 'inherit' });
