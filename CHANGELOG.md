# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
