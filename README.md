<p align="center">
  <a href="./logo/logo.png">
    <picture>
      <img alt="RealTestJS" src="./logo/logo.png">
    </picture>    
  </a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">Release Notes / History / Changes</a> 
</p>
<p align="center">
  <a href="./CONTRIBUTING.md">Contributing</a> 
</p>
<p align="center">
  <a href="https://github.com/VadimNastoyashchy/real-test-js/issues">Issue Tracker</a> 
</p>
<p align="center" style="font-size:120%;">
  Fast, easy and reliable testing for anything that runs in JS.
</p>

#### RealTestJS is a JavaScript test framework running on Node.js making testing simple and fun.

## Getting started

> Before you follow the steps below, make sure you have the

[Node.js](https://nodejs.org/en/download/) installed _globally_ only your system

## Installing

Install RealTestJS for Mac, Linux, or Windows:

```bash
npm install real-test-js --save-dev
```

or

```bash
yarn add real-test-js --dev
```

## Write test:

Use the test function to write test cases and the describe function to group them.
Let's start with test.js test file creation.

### `Example↓`

test.js

```
import { describe, test, beforeEach, afterEach, expect} from 'real-test-js'

describe('Title for describe block', () => {
  test('Title for test', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
  })
})
```

## Run test:

```bash
npx real-test-js --test="test.js"
```

or

```bash
yarn real-test-js --test="test.js"
```

Where **--test=** your test file path

## `Available CLI Options`

To run with config file **--config=** CLI arg:

```bash
npx real-test-js --config="your_config_name.config.json"
```

or

```bash
yarn real-test-js --config="your_config_name.config.json"
```

## `Configuration via config file`

- `test.config.json` - config for Real Test JS (works as an engine)

### `Example↓`

test.config.json

```
{
    "testFile": "test_folder/your_file.js",
    "testDir": "test_folder",
    "reporter": {
      "type": "json",
      "folderName": "report",
      "fileName": "results",
  },
}
```

---

| Option Name  | Required | Type   | Description             |
| ------------ | -------- | ------ | ----------------------- |
| `"testFile"` | false    | string | path to the test file   |
| `"testDir"`  | true     | string | path to the test folder |

---

### `Reporter options`

#### By default report is disabled.

To enable, add report configuration inside test config:

```
{
    "testDir": "your_test_folder",
    "reporter": {
      "type": "html"
  },
}
```

---

| Option Name    | Required | Type   | Description                                  |
| -------------- | -------- | ------ | -------------------------------------------- |
| `"type"`       | false    | string | reporter type. Now available: "json", "html" |
| `"folderName"` | false    | string | define reporter folder name                  |
| `"fileName"`   | false    | string | define reporter file name                    |

---

## `Test runner API`

---

| Option Name    | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| `"test"`       | `test` is where you perform individual tests                                          |
| `"describe"`   | `describe` is for organizing and grouping tests. Describe can be nested in `describe` |
| `"beforeEach"` | Command allows to define setup tasks at the beginning of every It block               |
| `"afterEach"`  | Command allow to define teardown tasks at the end of every It block                   |
| `"beforeAll"`  | Command allow to define setup tasks at the beginning of describe block                |
| `"afterAll"`   | Command allow to define teardown tasks at the end of describe block                   |

---

## `Assertions`

Use `expect(actual_value)` with assertions:

### `Example↓`

```
  const arr = [1, 2, 3]
  expect(arr).toHaveLength(3)
```

---

| Assert Name       | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `.toBeDefined()`  | Check actual value to be not undefined `expect(1).toBeDefined()`                               |
| `.toHaveLength()` | Check actual array length to have expected value `expect(arr).toHaveLength(number)`            |
| `.toBeFalsy()`    | Check actual value to be false                                                                 |
| `.toBeTruthy()`   | Check actual value to be true                                                                  |
| `.toEqual()`      | Check actual and expected value the same (using ===) `expect(value).toEqual(value)`            |
| `.notToEqual()`   | Check actual and expected value are not the same (using ===) `expect(value).notToEqual(value)` |

---

## `Context options`

Use `{}` as the second param for describe and tests func.

### `Example↓`

```
test('description', {}, () => {})
```

or

```
describe('description', {}, () => {})
```

### `Example↓`

```
  describe('description', { skip: true }, () => {})
  //or
  test('description', { skip: true }, () => {})
```

---

| Option Name         | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| `{ skip: true }`    | Option for skipping describe/test where it was provided                 |
| `{ timeout: 2000 }` | Option timeout (in ms) for specifying how long to wait before aborting. |
|                     | The default timeout is 5 seconds.                                       |

---

## `Async/Await support`

RealTestJS also supports async/await approach.
To use it just add `async` keyword before function callback inside `test` block

### `Example↓`

```
describe('Unit test for async', () => {
  test('Wait 1 sec and check', async () => {
    const number = await new Promise((resolve) =>
      setTimeout(() => resolve(1), 1_000)
    )
    expect(number).toBeDefined()
  })
})
```
