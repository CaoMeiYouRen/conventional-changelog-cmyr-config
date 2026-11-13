import { describe, expect, it } from 'vitest'
import { createParserOpts } from '../src/parser'

describe('parser', () => {
    it('解析 type、scope 与 subject', () => {
        const parser = createParserOpts()
        const match = parser.headerPattern.exec('fix(compile): avoid a bug')

        expect(match?.slice(1)).toEqual(['fix', 'compile', 'avoid a bug'])
    })

    it('解析 revert header 与 hash', () => {
        const parser = createParserOpts()
        const match = parser.revertPattern.exec(
            'Revert "feat(core): add new API"\n\nThis reverts commit abcdef1.',
        )

        expect(match?.[1]).toBe('feat(core): add new API')
        expect(match?.[2]).toBe('abcdef1')
    })
})
