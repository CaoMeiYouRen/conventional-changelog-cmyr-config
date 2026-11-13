import { describe, expect, it } from 'vitest'
import createPreset, { createWriterOpts, whatBump } from '../src/index'
import { createParserOpts } from '../src/parser'

describe('preset', () => {
    it('返回 parser、writer 与 whatBump', async () => {
        const preset = await createPreset()

        expect(preset.parser.headerPattern).toBeInstanceOf(RegExp)
        expect(typeof preset.writer.transform).toBe('function')
        expect(preset.whatBump).toBe(whatBump)
    })

    it('同时提供 writer 8 的字符串模板与 writer 9 的 template 函数', async () => {
        const writer = await createWriterOpts()

        expect(typeof writer.mainTemplate).toBe('string')
        expect(typeof writer.headerPartial).toBe('string')
        expect(typeof writer.commitPartial).toBe('string')
        expect(typeof writer.footerPartial).toBe('string')
        expect(typeof writer.template).toBe('function')
    })

    it('parser 能解析 header 与 BREAKING CHANGE', () => {
        const parser = createParserOpts()
        const match = parser.headerPattern.exec('feat(core): add new API')

        expect(match?.slice(1)).toEqual(['feat', 'core', 'add new API'])
        expect(parser.noteKeywords).toContain('BREAKING CHANGE')
    })
})
