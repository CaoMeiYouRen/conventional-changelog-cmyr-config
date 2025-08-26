import pkg from './package.json' with { type: 'json' }
const { name } = pkg
/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                config: './dist/index.mjs',
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                config: './dist/index.mjs',
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
                changelogTitle: `# ${name}`,
            },
        ],
        '@semantic-release/npm',
        '@semantic-release/github',
        [
            '@semantic-release/git',
            {
                assets: [
                    'CHANGELOG.md',
                    'package.json',
                ],
            },
        ],
    ],
}
