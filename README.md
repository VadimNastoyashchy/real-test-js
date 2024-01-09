<p align="center">
  <a href="./logo/logo.png">
    <picture>
      <img alt="RealTestJS" src="./logo/logo.png">
    </picture>    
  </a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">Changelog</a> 
</p>
<p align="center" style="font-size:120%;">
  Fast, easy and reliable testing for anything that runs in JS.
</p>

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

Use the it function to write test cases and the describe function to group them.

### `Example↓`

test.js

```
import { describe, it } from '../src/core.mjs'

describe('First describe', () => {
  // you're code
  it('First it inside first describe', () => {
    // you're code
  })
})


describe('Second describe', () => {
  // you're code
  it('First it inside second describe', () => {
    // you're code
  })
})
```

## Run test:

```
npx real-test-js --spec="test.js"
```

Where **--spec=** your test file path

## `Available CLI Options`

To run with config file **--config=** CLI arg:

```
npx real-test-js --config="your_config_name.config.json"
```

To run with spec file **--spec=** CLI arg:

```
npx real-test-js --spec="test.js"
```

## `Configuration via config file`

- `your_config_name.config.json` - config for Real Test JS (works as an engine)

### `Example↓`

test.config.json

```
{
    "specFile": "your_folder/your_file.js"
}
```

---

| Option Name  | Required | Type   | Description           |
| ------------ | -------- | ------ | --------------------- |
| `"specFile"` | true     | string | path to the test file |

---
