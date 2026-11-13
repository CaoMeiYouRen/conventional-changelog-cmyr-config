import { writeChangelogString as writeWithWriter8 } from 'conventional-changelog-writer-8'
import { writeChangelogString as writeWithWriter9 } from 'conventional-changelog-writer-9'
import { describe, expect, it } from 'vitest'
import { createWriterOpts } from '../src/writer'

const commits = [
    {
        type: 'feat',
        scope: 'core',
        subject: 'add new API, closes #12 and thanks @alice',
        header: 'feat(core): add new API',
        hash: 'abcdef1234567890',
        notes: [],
        references: [{ issue: '12', prefix: '#', owner: null, repository: null }],
    },
    {
        type: 'fix',
        scope: '*',
        subject: 'fix crash',
        header: 'fix(*): fix crash',
        hash: '1234567890abcdef',
        notes: [],
        references: [{ issue: '7', prefix: '#', owner: 'someowner', repository: 'somerepo' }],
    },
    {
        type: 'docs',
        scope: '',
        subject: 'hidden docs',
        header: 'docs: hidden docs',
        hash: 'fedcba9876543210',
        notes: [],
        references: [],
    },
    {
        type: 'feat',
        scope: '',
        subject: 'breaking feature',
        header: 'feat: breaking feature',
        hash: 'deadbeef12345678',
        notes: [{ title: 'BREAKING CHANGE', text: 'This breaks stuff.' }],
        references: [],
    },
    {
        type: 'revert',
        scope: '',
        subject: 'Revert "bad thing"',
        header: 'revert: bad thing',
        hash: 'beefdead12345678',
        notes: [],
        references: [],
        revert: { header: 'fix: bad thing', hash: '1111111' },
    },
]

const context = {
    version: '4.0.0',
    isPatch: false,
    host: 'https://github.com',
    owner: 'CaoMeiYouRen',
    repository: 'conventional-changelog-cmyr-config',
    repoUrl: 'https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config',
    commit: 'commit',
    issue: 'issues',
    linkReferences: true,
    linkCompare: true,
    previousTag: 'v3.0.0',
    currentTag: 'v4.0.0',
    date: '2026-11-13',
}

describe('writer 兼容性', () => {
    it('writer 8 与 writer 9 输出完全一致', async () => {
        const writerOpts = await createWriterOpts()

        const output8 = await writeWithWriter8(commits, context, writerOpts)
        const output9 = await writeWithWriter9(commits, context, writerOpts)

        expect(output9).toBe(output8)
    })

    it('保留分组、链接与 breaking changes，并过滤默认关闭的类型', async () => {
        const writerOpts = await createWriterOpts()
        const output = await writeWithWriter9(commits, context, writerOpts)

        expect(output).toContain('### ✨ 新功能')
        expect(output).toContain('### 🐛 Bug 修复')
        expect(output).toContain('### ⏪ 回退')
        expect(output).toContain('### 💥 BREAKING CHANGES')
        expect(output).toContain('**core:** add new API')
        expect(output).toContain('[#12](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/issues/12)')
        expect(output).toContain('[@alice](https://github.com/alice)')
        expect(output).toContain('([abcdef1](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/abcdef1))')
        expect(output).toContain('* fix crash')
        expect(output).not.toContain('### 📝 文档')
        expect(output).not.toContain('hidden docs')
    })
})
