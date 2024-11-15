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
<p align="center">
  <a href="https://www.npmjs.com/package/real-test-js">Link to NPM repository > real-test-js</a> 
</p>
<p align="center" style="font-size:120%;">
  Fast and trustworthy testing for everything JS!
</p>

#### RealTestJS is a JavaScript testing framework running on Node.js that makes testing easy and fun.

## Getting started

> Before you follow the steps below, make sure that you have:

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

## Write your first test:

Use the `test` function to write test cases and the `describe` function to group them. 

More example:

https://github.com/VadimNastoyashchy/real-test-js-boilerplate-project

Let's start by creating the `test.js` test file.

> Runner has JavaScript support only

> Runner has ESM support only

### `Example↓`

test.js

```
import { describe, test, expect} from 'real-test-js'

describe('Title for describe block', () => {
  test('Title for test', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
  })
})
```

## Run test:
Specify the **--file=** argument as the path to your test file

```bash
npx real-test-js --file="test.js"
```

or

```bash
yarn real-test-js --file="test.js"
```

### or
Specify the **--folder=** argument as the path to your test(s) folder

```bash
npx real-test-js --folder="tests"
```

or

```bash
yarn real-test-js --folder="tests"
```



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

| Assert Name          | Description                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `.toBeDefined()`     | Check actual value to be not undefined `expect(1).toBeDefined()`                                |
| `.toHaveLength()`    | Check actual array length to have expected value `expect(arr).toHaveLength(number)`             |
| `.toBeFalsy()`       | Check actual value to be false                                                                  |
| `.toBeTruthy()`      | Check actual value to be true                                                                   |
| `.toBeEqual()`       | Check actual and expected values are the same (using ===) `expect(value).toEqual(value)`        |
| `.notToEqual()`      | Check actual and expected values are not the same (using ===) `expect(value).notToEqual(value)` |
| `.toBeNull()`        | Check actual value to be null                                                                   |
| `.notToBeNull()`     | Check actual value to be not null                                                               |
| `.toBeUndefined()`   | Check actual value to be undefined                                                              |
| `.toBeNaN()`         | Check actual value to be NaN                                                                    |
| `.toBeGreaterThan()` | Check actual value to be greater than expected value                                            |
| `.toBeLessThan()`    | Check actual value to be less than expected value                                               |
| `.toContain()`       | Use when you want to check that an item is in an array or a string.                             |
| `.toMatch()`         | Use .toMatch() to check that a string matches a regular expression.                             |

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
test('Wait 1 sec and check', async () => {
  const number = await new Promise((resolve) =>
    setTimeout(() => resolve(1), 1_000)
  )
  expect(number).toBeDefined()
})
```
