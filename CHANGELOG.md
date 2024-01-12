# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- New features: 
  - support multiple test files by providing test folder
    `--spec-folder=\"test\"`

  - new context options object `{}` as the second param for describe and tests func.
    `test('description', {}, () => {})`

  - new `{ skip: true }` option for skipping describe/test
    `describe('description', { skip: true }, () => {})`
    `test('description', { skip: true }, () => {})`

- Added config file `test.config.json`
- Added printing describe name

### Changed
- Updated documentation
- Code optimization

## 1.4.0 - 2024-01-11
### Added
- New features - Assertions
- Added `expect()`
- Added:
  - `.toBeDefined()`
  - `.toHaveLength()`
  - `.toBeFalsy()`
  - `.toBeTruthy()`
  - `.toEqual()`
  - `.notToEqual()`
- Added assertion errors
- Added runner errors

### Changed
- Updated core
- Updated documentation

## 1.3.0 - 2024-01-11
### Added
- Test hooks:
  - `beforeAll(() => {})`
  - `afterAll(() => {})`

### Changed
- Update release workflow file with adding release option list.
- Changed it() → test()

### Fixed
- Fixed afterEach() functionality.

## 1.2.0 - 2024-01-10
### Added
- Test hooks:
  - `beforeEach(() => {})`
  - `afterEach(() => {})`
  This new functionality is applicable to (it) block.
- Added project keywords.

### Changed
- Update readme file.

### Fixed
- Minor fixes.

## 1.1.0 - 2024-01-09

## 1.0.5 - 2024-01-09
### Added
- Test runner core.
- Runner configuration.
- CI configuration.
- Unit test.
- Lint.
- Documentation.

### Fixed
- Minor fixes.
