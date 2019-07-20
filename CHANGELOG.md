# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
