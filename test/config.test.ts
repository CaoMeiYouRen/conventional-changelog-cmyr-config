import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { loadConfig } from '../src/writer'

const tempDirs: string[] = []

async function createTempDir() {
    const dir = await mkdtemp(join(tmpdir(), 'cmyr-changelog-'))
    tempDirs.push(dir)
    return dir
}

afterEach(async () => {
    await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })))
})

describe('loadConfig', () => {
    it('没有 package.json 时使用英文默认配置', async () => {
        const dir = await createTempDir()

        const { config, settings } = await loadConfig(dir)

        expect(config.language).toBeUndefined()
        expect(settings.feat.title).toBe('✨ Features')
        expect(settings.feat.enable).toBe(true)
    })

    it('根据 changelog.language 使用中文默认配置', async () => {
        const dir = await createTempDir()
        await writeFile(join(dir, 'package.json'), JSON.stringify({
            changelog: {
                language: 'zh',
            },
        }))

        const { settings } = await loadConfig(dir)

        expect(settings.feat.title).toBe('✨ 新功能')
        expect(settings.chore.title).toBe('🎫 其他更新')
    })

    it('package.json 不是合法 JSON 时抛错', async () => {
        const dir = await createTempDir()
        await writeFile(join(dir, 'package.json'), '{ invalid json')

        await expect(loadConfig(dir)).rejects.toThrow(SyntaxError)
    })
})
