/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    extends: ['semantic-release-cmyr-config'],
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
    ],
}
