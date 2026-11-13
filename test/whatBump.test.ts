import { describe, expect, it } from 'vitest'
import { whatBump } from '../src/whatBump'

const commit = (type: string, notes: unknown[] = []) => ({
    type,
    notes,
})

describe('whatBump', () => {
    it('BREAKING CHANGE 返回 major', () => {
        const result = whatBump([
            commit('feat', [{ title: 'BREAKING CHANGE', text: 'breaking' }]),
            commit('feat'),
        ])

        expect(result.level).toBe(0)
        expect(result.reason).toContain('1 BREAKING CHANGE')
    })

    it('feat 返回 minor', () => {
        const result = whatBump([commit('feat')])

        expect(result.level).toBe(1)
    })

    it('fix 返回 patch', () => {
        const result = whatBump([commit('fix')])

        expect(result.level).toBe(2)
    })
})
