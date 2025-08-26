// eslint.config.mjs
import { defineConfig } from 'eslint/config'
import cmyr from 'eslint-config-cmyr'

export default defineConfig([
    cmyr,
    {
        rules: {
            // 保留原有的特殊配置
            'no-shadow': 0,
            '@typescript-eslint/no-shadow': 0,
            '@typescript-eslint/no-require-imports': 0,
            '@typescript-eslint/explicit-module-boundary-types': [1, {
                allowArgumentsExplicitlyTypedAsAny: true,
            }],
            '@stylistic/no-trailing-spaces': 0,
        },
    },
])
