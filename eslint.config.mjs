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
        },
    },
])
