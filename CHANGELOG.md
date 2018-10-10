# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

<!---
### Added
### Changed
### Fixed
### Removed
-->

### TODO
- Refactor rollup configs - allow per-compile options
- Add *browser* property to library-mode package.json for SSR usage

## [1.0.0] - 2018-10-09
### Changed
- Updated README<!--- -->.md with library mode usage

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
