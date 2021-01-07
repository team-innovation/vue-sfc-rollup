# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2021-01-07

### Removed
- Removed beta tag

### Changed/Removed
- **BREAKING CHANGE**: Drop support for node 10
- Update cli dependencies
    - prompts 2.4.0
    - eslint 7.17.0
    - eslint-config-airbnb-base 14.2.1
    - eslint-plugin-import 2.22.1
    - husky 4.3.7
- Update template dependencies
    - @babel/core 7.12.10
    - @babel/preset-env 7.12.11
    - @babel/preset-typescript 7.12.7
    - @rollup/plugin-babel 5.2.2
    - @rollup/plugin-commonjs 17.0.0
    - @rollup/plugin-node-resolve 11.0.1
    - @rollup/plugin-replace 2.3.4
    - @vue/cli-plugin-babel 4.5.10
    - @vue/cli-plugin-typescript 4.5.10
    - @vue/cli-service 4.5.10
    - @vue/compiler-sfc 3.0.5 (Vue 3)
    - cross-env 7.0.3
    - **NEW** postcss 8.2.3 (Vue 3, peer of rollup-plugin-postcss 4.0.0)
    - rollup 2.36.1
    - rollup-plugin-postcss 4.0.0
    - rollup-plugin-vue 6.0.0 (Vue 3)
    - vue 3.0.5 (Vue 3)

### Known Issues
- Vue 3 tree-shaking is broken
    - This is due to a [known bug with @vue/compiler-sfc](https://github.com/vuejs/vue-next/issues/2860), used by rollup-plugin-vue
    - Vue 2 is not affected

## [4.0.0-beta.1] - 2020-10-15

### Fixed
- Typescript type declarations don't conflict anymore (Vue 3)
- Fixed tree-shaking issues (Vue 2)
  - package.json includes `"sideEffects": false`
  - Marked appropriate functions as `/*#__PURE__*/`
  - Upstream issues may still exist in [vue-runtime-helpers](https://github.com/znck/vue-runtime-helpers/pull/5), but current testing shows output should still be shakeable

### Changed/Removed
- Update template dependencies
  - @babel/core 7.12.0
  - @babel/preset-env 7.12.0
  - @babel/preset-typescript 7.12.0
  - @rollup/plugin-babel 5.2.1
  - @vue/cli-plugin-babel 4.5.7
  - @vue/cli-plugin-typescript 4.5.7
  - @vue/cli-service 4.5.7
  - @vue/compiler-sfc 3.0.0 (Vue 3)
  - rollup 2.30.0
  - rollup-plugin-postcss 3.1.8
  - rollup-plugin-terser 7.0.2
  - vue 3.0.0 (Vue 3)

## [4.0.0-beta.0] - 2020-09-04

### Added
- **NEW**: Vue 3 support! Select target version of Vue - components compiled for Vue 3 are not compatible with Vue 2

### Changed/Removed
- Update cli dependencies
  - chalk 4.1.0
  - ejs 3.1.5
  - eslint 7.7.0
  - eslint-config-airbnb-base 14.2.0
  - eslint-plugin-import 2.22.0
- Update templates depending on Vue version selected
  - **BREAKING CHANGE**: Remove auto-install logic/output entirely
    - Auto-install has become an anti-pattern, since Vue 3 will not allow registering components/libraries globally
  - **BREAKING CHANGE**: Non-esm builds now attach named exports as properties of the default export
    - Nodejs/browser usage is now registered via `Vue.use(globalVar)` instead of `Vue.use(globalVar.default)`, with named exports still accessed as `globalVar.named1`, `globalVar.named2` etc.
- Update template dependencies
  - @babel/core 7.11.0
  - @babel/preset-env 7.11.0
  - @babel/preset-typescript 7.10.4
  - @rollup/plugin-alias 3.1.1
  - @rollup/plugin-babel 5.2.0
  - @rollup/plugin-commonjs 14.0.0
  - **NEW** @rollup/node-resolve 9.0.0
  - @rollup/plugin-replace 2.3.3
  - @vue/cli-plugin-babel 4.5.4
  - @vue/cli-plugin-typescript 4.5.4
  - @vue/cli-service 4.5.4
  - @vue/compiler-sfc 3.0.0-rc.9 (Vue 3 only)
  - rollup 2.26.5
  - **NEW** rollup-plugin-postcss 3.1.6 (Vue 3 only)
  - rollup-plugin-terser 7.0.0
  - rollup-plugin-vue 5.1.9 (Vue 2) / 6.0.0-beta.10 (Vue 3)
  - vue 2.6.12 (Vue 2) / 3.0.0-rc.9 (Vue 3)
  - vue-template-compiler 2.6.12 (Vue 2 only)

## [3.0.1] - 2020-06-05

### Fixed
- Fixes [#41](https://github.com/team-innovation/vue-sfc-rollup/issues/41) - Update babel.config.js to fix dev mode via vue-cli-service
  - Dev mode uses @vue/babel-preset-app
  - Build mode uses @babel/preset-env and @babel/preset-typescript (if writing typescript)

## [3.0.0] - 2020-04-29

### Changed
- **BREAKING CHANGE**: Drop support for node 8
- Update template dependencies
  - @babel/core 7.9.0
  - @babel/preset-env 7.9.5
  - @babel/preset-typescript 7.9.0
  - @rollup/plugin-alias 2.2.0
  - @rollup/plugin-commonjs 11.1.0
  - @rollup/plugin-replace 2.3.2
  - @vue/cli-plugin-babel 4.3.1
  - @vue/cli-plugin-typescript 4.3.1
  - @vue/cli-service 4.3.1
  - cross-env 7.0.2
  - minimist 1.2.5
  - rollup 2.7.3
  - rollup-plugin-babel 4.4.0
  - rollup-plugin-terser 5.3.0
  - rollup-plugin-vue 5.1.6
  - typescript 3.8.3
  - vue 2.6.11
  - vue-template-compiler 2.6.11

### Fixed
- **BREAKING CHANGE**: Remove auto-install logic/output from esm output
  - This is _part_ of a bug [#39](https://github.com/team-innovation/vue-sfc-rollup/issues/39), preventing proper tree-shaking of esm builds. Resolution explained [here](https://github.com/webpack/webpack/issues/9614). Related bug reported to rollup-plugin-vue [here](https://github.com/vuejs/rollup-plugin-vue/issues/344).
- Renamed template files `src/serve-dev.{vue|js|ts}` to `dev/serve.{vue|js|ts}`
  - Removes need to explicitly ignore it from npm bundle
  - Resolves bug [#40](https://github.com/team-innovation/vue-sfc-rollup/issues/39) with yarn and package.json `files` array rules containing negate flag

## [2.3.1] - 2020-01-24

### Changed
- Removed babel plugin dependencies that are now in babel core
  - **REMOVED** @babel/plugin-proposal-optional-chaining
  - **REMOVED** @babel/plugin-proposal-nullish-coalescing-operator

### Fixed
- Changed order of rollup plugins (@rollup/plugin-commonjs) in templates to prevent failed build when using some babel features (optional chaining/nullish coalescing)

## [2.3.0] - 2020-01-15

### Added
- Add `browser` field to package.json for bundlers which prefer it to `module` field (eg. codesandbox - see [discussion here](https://github.com/codesandbox/codesandbox-client/issues/3305))
- Notify users of new releases
  - **NEW** chalk 3.0.0
  - **NEW** update-check 1.5.3
- Update template dependencies
  - @rollup/plugin-commonjs 11.0.1

### Changed
- Update template dependency
  - rollup-plugin-vue 5.1.5 ([breaking change from 5.1.2 has been resolved](https://github.com/vuejs/rollup-plugin-vue/issues/303))

## [2.2.2] - 2020-01-08

### Fixed
- Fix eslint errors in files created by vue-sfc-rollup

## [2.2.1] - 2019-12-31

### Fixed
- Updated package.json with missing file

## [2.2.0] - 2019-12-28

### Added
- Add ability to generate typescript-based components/libraries
- Generated components/libraries now both use `npm run serve` for rapid development (via `vue-cli-service`)
- Generate default `.browserslistrc` file
- Replace buble with babel - seeing this more ecosystem-wide
  - Allows optional chaining, nullish coalescing support, and other modern language features
  - Allows better browser targeting via `.browserslistrc` file
  - Output isn't necessarily larger with proper configuration via `.browserslistrc`

### Changed
- Update template dependencies
  - **NEW** @babel/core 7.7.7
  - **NEW** @babel/plugin-proposal-nullish-coalescing-operator 7.7.4
  - **NEW** @babel/plugin-proposal-optional-chaining 7.7.5
  - **NEW** @babel/preset-env 7.7.7
  - **NEW** @vue/cli-plugin-babel 4.1.0
  - **NEW** @vue/cli-service 4.1.0
  - **NEW** rollup-plugin-babel 4.3.3
  - rollup 1.27.13
  - rollup-plugin-terser 5.1.3
- Added new template dependencies for typescript-based projects
  - @babel/preset-typescript 7.7.7
  - @vue/cli-plugin-typescript 4.1.0
  - typescript 3.7.3
- Cli development code refactor/cleanup

## [2.1.0] - 2019-11-07

### Added/Fixed
- Vue cli aliases '@' to './src' for imports, add capability to rollup config for feature parity

### Changed
- Do not minify esm build - upstream bundlers should handle this
- Update template dependencies
  - **NEW** @rollup/plugin-alias 2.2.0
  - rollup 1.26.3
  - rollup-plugin-buble > @rollup/plugin-buble 0.20.0
  - rollup-plugin-replace > @rollup/plugin-replace 2.2.1

### Added
- New/updated tooling for cli development

## [2.0.1] - 2019-10-31

### Fixed
- Avoid bug introduced in [rollup-plugin-vue 5.1.2](https://github.com/vuejs/rollup-plugin-vue/issues/303) - lock in use of v5.1.1 in generated package.json until issue is resolved.

### Changed
- Rollup config updates in single/lib modes - 'external' missing from esm build config
- Update template dependencies
  - cross-env 6.0.3
  - rollup 1.26.1
  - rollup-plugin-commonjs 10.1.0
  - rollup-plugin-terser 5.1.2
  - rollup-plugin-vue 5.1.1

### Added
- New/updated tooling for cli development

## [2.0.0] - 2019-05-17

### Added/Fixed
- Optimized SSR Builds (Single and Library)

### Changed
- **BREAKING CHANGE**: Command renamed from *sfc-rollup-init* to *sfc-init*
- Replace 'umd' build with CommonJS 'ssr' build
  - Browsers still get iife
  - Modern bundlers get esm
  - Node.JS/Legacy get ssr
  - Any scenarios not covered above can transpile esm or raw .vue files directly
- Refactor template package.json to reflect umd -> ssr changes
- Update cli dependencies
  - prompts 2.0.4
  - eslint 5.16.0
  - eslint-plugin-import 2.17.2
- Update template dependencies
  - vue 2.6.10
  - vue-template-compiler 2.6.10
  - rollup 1.12.1
  - rollup-plugin-vue 5.0.0
  - rollup-plugin-commonjs 10.0.0
  - rollup-plugin-replace 2.2.0

## [1.1.1] - 2019-03-06

### Changed
- Drop 'uglify-es' for 'terser' - uglify-es no longer maintained
- Refactor rollup configs with per-compile options
- Update template dependencies
  - vue 2.6.8
  - vue-template-compiler 2.6.8
  - rollup 1.4.1
  - rollup-plugin-vue 4.7.2
  - rollup-plugin-commonjs 9.2.1

## [1.1.0] - 2019-01-31

### Changed
- Drop 'readline-sync' for 'prompts' - better UX, allow cli to be canceled
- Update template dependencies
  - vue 2.5.22
  - vue-template-compiler 2.5.21
  - rollup 1.1.2
  - rollup-plugin-vue 4.6.2
  - \*new* rollup-plugin-commonjs 9.2.0 (due to rollup-plugin-vue)

## [1.0.3] - 2019-01-12

### Fixed
- export install function in lib mode. singe/lib modes can now be registered via both Vue.use() and Vue.component().

## [1.0.2] - 2019-01-12

### Fixed
- avoid bug introduced in [rollup-plugin-vue 4.4.0](https://github.com/vuejs/rollup-plugin-vue/issues/257) - lock in use of v4.3.2 in generated package.json until issue is resolved.

## [1.0.1] - 2018-12-14

### Fixed
- build process now runs in 'production' mode by default - smaller, more secure files

## [1.0.0] - 2018-10-10

### Changed
- Updated [README.md](README.md) with library mode usage

### Fixed
- npm processed template package.json files instead of just including them - renamed

### Removed
- Removed unused .gitignore rules

## [1.0.0-alpha.0] - 2018-10-03

### Added
- Library mode - ability to scaffold library of components
- Prompts for single/library mode
- Named exports of individual components in library mode

### Changed
- **BREAKING CHANGE**: Don't export sfc *install* function, only ever used in autoinstall
- Rename some files to better indicate their purpose
- Switch to ejs for templating
- Implement eslint, consistent airbnb formatting

## [0.3.1] - 2018-05-18

### Added
- Link to official entry on npm
- Add licensing information

### Changed
- Updated repo url

### Removed
- Removed beta tag

## [0.3.0] - 2018-04-10

### Added
- Initial beta release
