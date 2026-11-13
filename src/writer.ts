import { readFile } from 'fs/promises'
import { resolve } from 'path'
import compareFunc from 'compare-func'
import debug from 'debug'
import Handlebars from 'handlebars'

const log = debug('conventional-changelog:cmyr-config')
const COMMIT_HASH_LENGTH = 7

// 类型配置接口
interface TypeConfig {
    title: string
    enable: boolean
}

interface TypeSettings {
    [key: string]: TypeConfig
}

interface ChangelogConfig {
    language?: string
    bugsUrl?: string | false
    settings?: Partial<TypeSettings>
}

// 默认的英文配置
const enDefaultSettings: TypeSettings = {
    feat: {
        title: '✨ Features',
        enable: true,
    },
    fix: {
        title: '🐛 Bug Fixes',
        enable: true,
    },
    perf: {
        title: '⚡ Performance Improvements',
        enable: true,
    },
    revert: {
        title: '⏪ Reverts',
        enable: true,
    },
    refactor: {
        title: '📦 Code Refactoring',
        enable: true,
    },
    docs: {
        title: '📝 Documentation',
        enable: false,
    },
    style: {
        title: '💎 Styles',
        enable: false,
    },
    test: {
        title: '✅ Tests',
        enable: false,
    },
    build: {
        title: '👷 Build System',
        enable: false,
    },
    ci: {
        title: '🔧 Continuous Integration',
        enable: false,
    },
    chore: {
        title: '🎫 Chores',
        enable: false,
    },
}

// 默认的中文配置
const zhDefaultSettings: TypeSettings = {
    feat: {
        title: '✨ 新功能',
        enable: true,
    },
    fix: {
        title: '🐛 Bug 修复',
        enable: true,
    },
    perf: {
        title: '⚡ 性能优化',
        enable: true,
    },
    revert: {
        title: '⏪ 回退',
        enable: true,
    },
    refactor: {
        title: '📦 代码重构',
        enable: true,
    },
    docs: {
        title: '📝 文档',
        enable: false,
    },
    style: {
        title: '💎 风格',
        enable: false,
    },
    test: {
        title: '✅ 测试',
        enable: false,
    },
    build: {
        title: '👷 构建',
        enable: false,
    },
    ci: {
        title: '🔧 CI 配置',
        enable: false,
    },
    chore: {
        title: '🎫 其他更新',
        enable: false,
    },
}

// 必须选项和可选选项
const requiredOptions = ['feat', 'fix', 'perf', 'revert', 'refactor']
const optionalOptions = ['docs', 'style', 'test', 'build', 'ci', 'chore']

// 读取package.json配置
async function loadConfig(): Promise<{
    config: ChangelogConfig
    settings: TypeSettings
}> {
    let pkgJson: { changelog?: ChangelogConfig } = {}

    try {
        const pkgJsonContent = await readFile(resolve(process.cwd(), './package.json'), 'utf-8')
        pkgJson = JSON.parse(pkgJsonContent)
    } catch {
        console.error('no root package.json found')
    }

    const changelog = pkgJson.changelog || {}

    // 根据语言选择默认配置
    const baseSettings = /(zh|cn|Han)/i.test(changelog.language || '') ? zhDefaultSettings : enDefaultSettings

    const defaultOptions: ChangelogConfig = {
        bugsUrl: false,
        settings: baseSettings,
    }

    const config = { ...defaultOptions, ...changelog }
    log('options: %o', config)

    // 合并用户自定义设置
    const settings: TypeSettings = {}
    for (const [key, value] of Object.entries(baseSettings)) {
        const userSetting = config.settings?.[key]
        if (!userSetting) {
            settings[key] = value
        } else {
            settings[key] = {
                title: typeof userSetting.title === 'string' ? userSetting.title : value.title,
                enable: typeof userSetting.enable === 'boolean' ? userSetting.enable : value.enable,
            }
        }
    }

    return { config, settings }
}

export interface WriterOptions {
    mainTemplate?: string
    template?: (context: any) => string
    headerPartial?: string
    commitPartial?: string
    footerPartial?: string
    transform: (commit: Commit, context: WriterContext) => Commit | undefined
    groupBy: string
    commitGroupsSort: string
    commitsSort: string[]
    noteGroupsSort: string
    notesSort: (a: any, b: any) => number
}

interface CommitNote {
    title?: string
    text?: string
    [key: string]: unknown
}

interface CommitReference {
    issue: string
    prefix?: string
    owner?: string | null
    repository?: string | null
    bugsUrl?: string
    [key: string]: unknown
}

interface Commit {
    type: string
    scope?: string
    subject?: string
    header?: string
    hash?: string
    notes: CommitNote[]
    references: CommitReference[]
    revert?: unknown
    [key: string]: unknown
}

interface WriterContext {
    repository?: string
    repoUrl?: string
    host?: string
    owner?: string
}

export async function createWriterOpts(): Promise<WriterOptions> {
    const { config, settings } = await loadConfig()

    const [
        template,
        header,
        commit,
        footer,
    ] = await Promise.all([
        readFile(new URL('../templates/template.hbs', import.meta.url), 'utf-8'),
        readFile(new URL('../templates/header.hbs', import.meta.url), 'utf-8'),
        readFile(new URL('../templates/commit.hbs', import.meta.url), 'utf-8'),
        readFile(new URL('../templates/footer.hbs', import.meta.url), 'utf-8'),
    ])

    const writerOpts = getWriterOpts(config, settings)

    writerOpts.mainTemplate = template
    writerOpts.headerPartial = header
    writerOpts.commitPartial = commit
    writerOpts.footerPartial = footer

    // conventional-changelog-writer@9 起模板改为函数，且 mainTemplate 被 template 取代。
    // 保留字符串模板供 writer 8 使用，同时用同一份模板编译出 writer 9 所需的 template。
    const hbs = Handlebars.create()
    hbs.registerPartial('header', header)
    hbs.registerPartial('commit', commit)
    hbs.registerPartial('footer', footer)
    writerOpts.template = hbs.compile(template, { noEscape: true })

    return writerOpts
}

function getWriterOpts(config: ChangelogConfig, settings: TypeSettings): WriterOptions {
    return {
        transform: (commit, context) => {
            const issues: string[] = []
            log('commit：%s', commit)

            // 创建新的 commit 对象来避免修改不可变对象
            const newCommit = { ...commit }

            // 处理 BREAKING CHANGES
            newCommit.notes = commit.notes.map((note) => ({
                ...note,
                title: '💥 BREAKING CHANGES',
            }))

            // 处理 commit 类型
            if (newCommit.revert) {
                newCommit.type = settings.revert.title
            } else if (requiredOptions.includes(newCommit.type)) {
                newCommit.type = settings[newCommit.type].title
            } else if (optionalOptions.includes(newCommit.type)) {
                // 检查是否启用了该类型
                if (!settings[newCommit.type].enable) {
                    log('该 commit 类型不生成日志：%s', settings[newCommit.type].title)
                    return undefined
                }
                newCommit.type = settings[newCommit.type].title
            } else {
                return undefined
            }

            log('commit.type：%s', newCommit.type)

            if (newCommit.scope === '*') {
                newCommit.scope = ''
            }

            if (typeof newCommit.hash === 'string') {
                newCommit.hash = newCommit.hash.substring(0, COMMIT_HASH_LENGTH)
            }

            if (typeof newCommit.subject === 'string') {
                let url = context.repository
                    ? `${context.host}/${context.owner}/${context.repository}`
                    : context.repoUrl

                if (url) {
                    url = `${url}/issues/`
                    // Issue URLs.
                    newCommit.subject = newCommit.subject.replace(/#([0-9]+)/g, (_match: string, issue: string) => {
                        issues.push(issue)
                        return `[#${issue}](${url}${issue})`
                    })
                }

                if (context.host) {
                    // User URLs.
                    newCommit.subject = newCommit.subject.replace(
                        /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
                        (_match: string, username: string) => {
                            if (username.includes('/')) {
                                return `@${username}`
                            }
                            return `[@${username}](${context.host}/${username})`
                        },
                    )
                }
            }

            // remove references that already appear in the subject
            newCommit.references = commit.references.filter((reference) => issues.indexOf(reference.issue) === -1)

            if (config.bugsUrl) {
                const bugsUrl = config.bugsUrl
                newCommit.references = newCommit.references.map((ref) => ({
                    ...ref,
                    bugsUrl,
                }))
            }

            return newCommit
        },
        groupBy: 'type',
        commitGroupsSort: 'title',
        commitsSort: ['scope', 'subject'],
        noteGroupsSort: 'title',
        notesSort: compareFunc('text'),
    }
}
