import { readFile } from 'fs/promises'
import { resolve } from 'path'
import compareFunc from 'compare-func'
import debug from 'debug'

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
    authorName?: string | false
    authorEmail?: string | false
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
        title: '💄 Styles',
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
        title: '💄 风格',
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
    gitUserInfo: string
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
        authorName: false,
        authorEmail: false,
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

    // 构建gitUserInfo
    let gitUserInfo = ''
    if (config.authorName && config.authorEmail) {
        gitUserInfo = 'by: **{{authorName}}** ({{authorEmail}})'
    } else if (config.authorName) {
        gitUserInfo = 'by: **{{authorName}}**'
    } else if (config.authorEmail) {
        gitUserInfo = 'by: ({{authorEmail}})'
    }

    return { config, settings, gitUserInfo }
}

export interface WriterOptions {
    mainTemplate?: string
    headerPartial?: string
    commitPartial?: string
    footerPartial?: string
    transform: (commit: any, context: any) => any
    groupBy: string
    commitGroupsSort: string
    commitsSort: string[]
    noteGroupsSort: string
    notesSort: (prop: any) => (a: any, b: any) => number
}

export async function createWriterOpts(): Promise<WriterOptions> {
    const { config, settings, gitUserInfo } = await loadConfig()

    const [
        template,
        header,
        commit,
        footer,
    ] = await Promise.all([
        readFile(resolve(__dirname, '../templates/template.hbs'), 'utf-8'),
        readFile(resolve(__dirname, '../templates/header.hbs'), 'utf-8'),
        readFile(resolve(__dirname, '../templates/commit.hbs'), 'utf-8'),
        readFile(resolve(__dirname, '../templates/footer.hbs'), 'utf-8'),
    ])

    const writerOpts = getWriterOpts(config, settings)

    writerOpts.mainTemplate = template
    writerOpts.headerPartial = header
    // 替换 commit.hbs 模板中的 gitUserInfo
    writerOpts.commitPartial = commit.replace(/\{\{gitUserInfo\}\}/g, gitUserInfo)
    writerOpts.footerPartial = footer

    return writerOpts
}

function getWriterOpts(config: ChangelogConfig, settings: TypeSettings): WriterOptions {
    return {
        transform: (commit, context) => {
            let discard = true
            const issues: string[] = []
            log('commit：%s', commit)

            // 处理 BREAKING CHANGES
            commit.notes.forEach((note) => {
                note.title = '💥 BREAKING CHANGES'
                discard = false
            })

            // 处理 commit 类型
            if (commit.revert) {
                commit.type = settings.revert.title
            } else if (requiredOptions.includes(commit.type)) {
                commit.type = settings[commit.type].title
            } else if (optionalOptions.includes(commit.type)) {
                // 检查是否启用了该类型
                if (!settings[commit.type].enable) {
                    log('该 commit 类型不生成日志：%s', settings[commit.type].title)
                    return undefined
                }
                commit.type = settings[commit.type].title
            } else {
                return undefined
            }

            log('commit.type：%s', commit.type)

            if (commit.scope === '*') {
                commit.scope = ''
            }

            if (typeof commit.hash === 'string') {
                commit.hash = commit.hash.substring(0, COMMIT_HASH_LENGTH)
            }

            if (typeof commit.subject === 'string') {
                let url = context.repository
                    ? `${context.host}/${context.owner}/${context.repository}`
                    : context.repoUrl

                if (url) {
                    url = `${url}/issues/`
                    // Issue URLs.
                    commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
                        issues.push(issue)
                        return `[#${issue}](${url}${issue})`
                    })
                }

                if (context.host) {
                    // User URLs.
                    commit.subject = commit.subject.replace(
                        /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
                        (_, username) => {
                            if (username.includes('/')) {
                                return `@${username}`
                            }
                            return `[@${username}](${context.host}/${username})`
                        },
                    )
                }
            }

            // remove references that already appear in the subject
            commit.references = commit.references.filter((reference) => issues.indexOf(reference.issue) === -1)

            if (config.bugsUrl) {
                commit.references = commit.references.map((ref) => ({
                    ...ref,
                    bugsUrl: config.bugsUrl,
                }))
            }

            return commit
        },
        groupBy: 'type',
        commitGroupsSort: 'title',
        commitsSort: ['scope', 'subject'],
        noteGroupsSort: 'title',
        notesSort: compareFunc,
    }
}
