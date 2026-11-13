// eslint.config.mjs
import { defineConfig } from 'eslint/config'
import cmyr from 'eslint-config-cmyr'

const scriptFiles = ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}']
const typeScriptFiles = ['**/*.{ts,tsx,mts,cts}']

export default defineConfig([
    cmyr,
    {
        files: scriptFiles,
        rules: {
            // 保留原有的特殊配置
            'no-shadow': 0,
            '@stylistic/no-trailing-spaces': 0,
        },
    },
    {
        files: typeScriptFiles,
        rules: {
            '@typescript-eslint/no-shadow': 0,
            '@typescript-eslint/no-require-imports': 0,
            '@typescript-eslint/explicit-module-boundary-types': [1, {
                allowArgumentsExplicitlyTypedAsAny: true,
            }],
        },
    },
])
