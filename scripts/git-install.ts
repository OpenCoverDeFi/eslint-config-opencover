import { execSync } from 'child_process';

const resolved = process.env.npm_package_resolved || '';

const isGitInstall = resolved.startsWith('git+') || resolved.includes('github.com') || resolved.includes('gitlab.com');

if (!isGitInstall) {
    process.exit(0);
}

// eslint-disable-next-line no-console
console.log('Git install detected, running build...');
execSync('pnpm build', { stdio: 'inherit' });

// git+https://github.com/OpenCoverDeFi/eslint-config-opencover.git#v3.0.0 => yarn build from consumre project like price-bk upon pnpm install => this is for not published packages

// config-opencover => yarn build won't be running because it's not a git install
