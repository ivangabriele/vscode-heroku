# [2.0.0](https://github.com/ivangabriele/vscode-heroku/compare/v1.4.3...v2.0.0) (2023-07-04)


### Bug Fixes

* **commands:** show login command success message once done ([fb311db](https://github.com/ivangabriele/vscode-heroku/commit/fb311dbc1ee47e76d87bd1ec005ec3dd4a65b3ee))
* **deps:** update dependency await-to-js to v3 ([#237](https://github.com/ivangabriele/vscode-heroku/issues/237)) ([822ec3b](https://github.com/ivangabriele/vscode-heroku/commit/822ec3bd611f39c6cac74c6a016d94cef574cddf))


* feat!: add Heroku CLI login check and command ([b4093e7](https://github.com/ivangabriele/vscode-heroku/commit/b4093e764aba57d720c23e9715e2cc6c19810829))


### Features

* add Heroku CLI logout command ([254d251](https://github.com/ivangabriele/vscode-heroku/commit/254d25181b6c4291da30ab3d27f3762c7b958e3e))
* improve UX and states lifecycle ([f255498](https://github.com/ivangabriele/vscode-heroku/commit/f255498ad164668c57ce7e7328d527a995eb6a6c))


### BREAKING CHANGES

* Full upgrade of the entire project.

# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][link-keep-changelog] and this project
adheres to [Semantic Versioning][link-semver].

## [1.4.3] - 2019-07-23

### Fixed

- Non-activation when no workspace.

## [1.4.2] - 2019-07-21

### Fixed

- Bundle issue (not working).

## [1.4.1] - 2019-07-20

### Fixed

- Extraneous distribution files.

## [1.4.0] - 2019-07-20

### Changed

- Includes teams applications.

### Fixed

- Heroku app detection for https.

## [1.3.0] - 2019-07-20

### Changed

- Improved errors handling.

### Fixed

- Heroku CLI detection cycle.
- Heroku app detection.

## [1.2.7] - 2019-07-19

### Fixed

- Useless error when no workspace.
- Package icon warning.
- Oversized published files.

## [1.2.6] - 2019-01-14

### Fixed

- Missing changelog update.

## [1.2.5] - 2019-01-14

### Fixed

- Inconsistant spawn behavior.

## [1.2.4] - 2018-11-01

### Fixed

- Edge cases for date ago in the SBI.

## [1.2.3] - 2018-11-01

### Fixed

- Recheck loop when the Heroku app is unlinked.

## [1.2.2] - 2018-11-01

### Changed

- Drop OSX on Travis.

### Fixed

- Wrong short date call in SBI.

## [1.2.1] - 2018-11-01

## Added

- Test setup.
- Simple helpers/exec() test.

### Changed

- Lower status loop delay to 2.5s.
- Increase spacing between icon and text in status bar.

## [1.2.0] - 2018-11-01

### Changed

- No reload required after (re-)linking the current workspace to an Heroku app.

## [1.1.1] - 2018-11-01

### Fixed

- Missing readme update.
- Auto-push when bumping version.

## [1.1.0] - 2018-11-01

### Added

- Command to link the current workspace with an existing Heroku application.

### Changed

- Cache status message.

## [1.0.1] - 2018-10-31

### Fixed

- Fix .vscodeignore related issue.

## [1.0.0] - 2018-10-31

### Added

- Initial release.
- Status Bar Item with date.

---

[link-keep-changelog]: http://keepachangelog.com/en/1.0.0/
[link-semver]: http://semver.org/spec/v2.0.0.html
