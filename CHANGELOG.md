# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added
- Default config creation
- Moved config file from .json >>> .js
- Added error handling

### Changed
- Refactored project file structure
- Updated documentation

## 1.8.1 - 2024-01-19
### Added
- Logic for handling and erroring args
  https://github.com/VadimNastoyashchy/real-test-js/issues/78
- vs code extension

### Changed
- Refactored cli, setup, .mjs

## 1.8.0 - 2024-01-17
### Added
- Js dock
- Async/Await support
- Added new `{ timeout: 2000 }`
  Option timeout (in ms) for specifying how long to wait before aborting.
  The default timeout is 5 seconds.
    `test('description', { timeout: 2000 }, () => {})`
- Assertions:
   - `.toBeNull()`
   - `.notToBeNull()`
   - `.toBeUndefined()`
   - `.toBeNaN()`
   - `.toBeGreaterThan()`
   - `.toBeLessThan()`
- Error handling for `expect` assertions
- Split Assertion file into separate Assertion files

### Changed
- Updated unit tests
- Updated documentation
- Optimized code
- Refactored code

### Fixed
- Fixed EOL for assertions

## 1.7.0 - 2024-01-14
### Added
- New features:
  - new stack trace format

### Fixed
- Fixed multiple nested folders:
  https://github.com/VadimNastoyashchy/real-test-js/issues/59.

## 1.6.0 - 2024-01-12
### Added
- New features:
  - reporter support
    - json
    - html
  
  - new reporter options object in the config
    reporter: {
        type: "json",
        folderName: "report",
        fileName: "results",
    },

### Changed
- Updated documentation
- Code optimization

## 1.5.0 - 2024-01-12
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
