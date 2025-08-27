# conventional-changelog-cmyr-config

# [3.0.0-beta.5](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2025-08-27)


### 🐛 Bug 修复

* 修改插件发布配置以使用本地配置 ([0d35e37](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/0d35e37))
* 更新 release.config.mjs 配置，启用 changelog 插件并移除扩展配置 ([03add6f](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/03add6f))

# [3.0.0-beta.4](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2025-08-27)


### 🐛 Bug 修复

* 更新依赖项 @types/node 至 ^24.3.0，修改样式标题为 💎 ([b19780e](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/b19780e))

# [3.0.0-beta.3](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2025-08-27)


### ⏪ 回退

* "fix: 确保 context.date 是有效的 Date 对象或字符串，添加日期转换逻辑" ([a355e94](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/a355e94))

# [3.0.0-beta.2](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2025-08-27)


### 🐛 Bug 修复

* 确保 context.date 是有效的 Date 对象或字符串，添加日期转换逻辑 ([d40b991](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/d40b991))

# [3.0.0-beta.1](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.1.2...v3.0.0-beta.1) (2025-08-26)


### ✨ 新功能

* 全面迁移自定义日志标题配置 ([28276bf](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/28276bf))
* 升级到 esm 模块；最低 Node.js 版本提升到 18 ([a8f663e](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/a8f663e))
* 更新 package.json 中的 Node.js 版本要求至 >=20.10 ([695d470](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/695d470))
* 添加 TypeScript 支持，重构项目结构并更新构建配置 ([2e7788d](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/2e7788d))


### 🐛 Bug 修复

* 为 getWriterOpts 函数添加类型定义，增强类型安全性 ([55f59d3](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/55f59d3))
* 在 package.json 中添加 templates 目录到文件列表 ([e0d50fd](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/e0d50fd))
* 更新 changelog 配置，添加调试信息并移除作者信息；调整 commit 模板以简化输出 ([1bf23c5](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/1bf23c5))
* 更新 changelog 配置，禁用作者姓名和邮箱显示；清理模板文件，移除多余空行 ([5441105](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/5441105))
* 更新 lint 脚本以修复路径问题，确保 ESLint 正确检查所有文件 ([e0542a6](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/e0542a6))
* 更新日志标题中的图标，统一使用包图标表示代码重构 ([35089ed](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/35089ed))


### 📦 代码重构

* 删除不再使用的 conventional-changelog.js 和 conventional-recommended-bump.js 文件，更新 writer.ts 中的 commit 处理逻辑以增强可读性和可维护性 ([fe46ca0](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/fe46ca0))
* 增强类型定义，添加 ParserOptions 和 WriterOptions 接口，更新相关函数以提高类型安全性 ([5da15cb](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/5da15cb))


### 💥 BREAKING CHANGES

* 重构项目为 TypeScript
* 项目升级到 esm 模块，并提升最低 Node.js 版本到 18

## [2.1.2](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.1.1...v2.1.2) (2024-04-17)


### 🐛 Bug 修复

* 修复 compare-func 版本问题 ([fa5b1e8](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/fa5b1e8))

## [2.1.1](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.1.0...v2.1.1) (2023-09-17)


### 🐛 Bug 修复

* 修复 项目中存在幽灵依赖的 bug ([81d1a80](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/81d1a80))

# [2.1.0](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.0.4...v2.1.0) (2023-03-14)


### ✨ 新功能

* 移除 lodash 依赖；优化 贡献者名单 ([2cbe102](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/2cbe102))

## [2.0.4](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.0.3...v2.0.4) (2021-12-24)


### 🐛 Bug 修复

* 回退 discard ([c09eafd](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/c09eafd))

## [2.0.3](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.0.2...v2.0.3) (2021-12-23)


### 🐛 Bug 修复

* 修复 gitUserInfo is not defined；新增 eslint；优化代码格式 ([ec61d5f](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/ec61d5f))
* 添加 BREAKING CHANGES 图标💥；优化配置的默认值合并方式 ([3d5245e](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/3d5245e))

## [2.0.2](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.0.1...v2.0.2) (2021-12-21)


### 🐛 Bug 修复

* 修复 禁用特定类型日志无效的 bug ([3b9f773](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/3b9f773))

## [2.0.1](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v2.0.0...v2.0.1) (2021-12-20)


### 🐛 Bug 修复

* 修复 可选配置问题 ([cbc1941](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/cbc1941))

# [2.0.0](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v1.0.1...v2.0.0) (2021-12-20)


### 🐛 Bug 修复

* 修复 可选选项 无效的问题 ([aacfbe8](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/aacfbe8))


### BREAKING CHANGES

* 项目整体迁移到 semantic-release，版本号管理出现问题，故进行大版本升级

## [1.3.1](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/compare/v1.0.0...v1.0.1) (2021-12-20)


### 🐛 Bug 修复

* 修复 changelog 的问题；回退部分代码 ([43d813f](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/43d813f))

# 1.3.0 (2021-12-20)


### ⏪ 回退

* 回退defaults ([fcf988b](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/fcf988b))


### ✨ 新功能

* initial commit ([bd84f0b](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/bd84f0b))
* 新增 emojis 图形，修改 discard 判断位置 ([c7f39c1](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/c7f39c1))
* 新增 release 配置；修复 默认值错误问题；移除 defaults 包 ([301c377](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/301c377))
* 新增changelog自定义配置 ([d60c9a1](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/d60c9a1))
* 新增language配置 ([06b35b4](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/06b35b4))
* 添加 GitLab 项目生成的 commit 能够查看具体信息 ([89c5720](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/89c5720))


### 🐛 Bug 修复

* 修改defaults ([a985d5a](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/a985d5a))
* 移除了defaults ([2f224a9](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/2f224a9))


### chore

* 修复 Cannot find module 'conventional-changelog-cmyr-config' ([94147bc](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/94147bc))
* 修改了包名称 ([dbbed8d](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/dbbed8d))
* 修改了更新日志的生成类型 ([e26ec6e](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/e26ec6e))
* 发布1.0.0 ([469e2dd](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/469e2dd))
* 新增debug ([a3dd440](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/a3dd440))


### ci

* 移除不必要的步骤 ([5e6f82f](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/5e6f82f))


### docs

* **README.md:** 修改版本徽章 ([5871921](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/5871921))
* **README.md:** 删除版本徽章标志 ([41f14c7](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/41f14c7))
* 修改了README.md ([4ca4db9](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/4ca4db9))
* 正式发布 ([2a93fd7](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/2a93fd7))


* 1.2.3 ([89448fd](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/89448fd))
* 1.2.2 ([cb4c795](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/cb4c795))
* 1.2.1 ([f6b9382](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/f6b9382))
* 1.2.0 ([7a3708e](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/7a3708e))
* 1.2.0-beta ([d1d3b06](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/d1d3b06))
* 1.1.0 ([b26823e](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/b26823e))
* 1.1.0-beta ([0abc55e](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/0abc55e))
* 1.0.1-beta ([b0f9233](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/b0f9233))
* 1.0.0 ([e8a771b](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/e8a771b))
* 0.1.0-beta ([372cb36](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/372cb36))
* 0.4.0-beta ([ecbf2f0](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/ecbf2f0))
* 0.3.1 ([eb0df72](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/eb0df72))
* 1.0.0 ([0ef2773](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/0ef2773))
* Release 0.3.1 ([d51a464](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/d51a464))
* Release 0.3.0 ([da38ebb](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/da38ebb))
* Release 0.2.0 ([99a6dfd](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/99a6dfd))
* Release 0.1.4 ([c6cf227](https://github.com/CaoMeiYouRen/conventional-changelog-cmyr-config/commit/c6cf227))

# [0.2.0](https://github.com/ITxiaohao/conventional-changelog-custom-config/compare/0.1.4...0.2.0) (2019-07-19)

### ✨ Features

- 新增 emojis 图形，修改 discard 判断位置 ([c7f39c1](https://github.com/ITxiaohao/conventional-changelog-custom-config/commit/c7f39c1)) by: **ITxiaohao** (shunhaozeng@gmail.com)

## [0.1.4](https://github.com/ITxiaohao/conventional-changelog-custom-config/compare/bd84f0b...0.1.4) (2019-07-10)

### ✨ Features

- initial commit ([bd84f0b](https://github.com/ITxiaohao/conventional-changelog-custom-config/commit/bd84f0b)) by: **ITxiaohao** (shunhaozeng@gmail.com)
