# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
