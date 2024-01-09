# `RealTestJS`

# Next gen js test runner

## Getting started

> Before you follow the steps below, make sure you have the

[Node.js](https://nodejs.org/en/download/) installed _globally_ only your system

1. Install all the necessary dependency using npm :

```
npm install
```
### Run test:

```
npx real-test-js --spec="test.js"
```

Where **--spec=** your test file path


## Configs

- `your_config_name.config.json` - config for Real Test JS (works as an engine)

### `Example↓`

```
{
    "specFile": "your_folder/your_file.js"
}
```

## `Available Options`

To run with config file **--config=** CLI arg:

```
npx real-test-js --config="your_config_name.config.json"
```

To run with spec file **--spec=** CLI arg:

```
npx real-test-js --spec="test.js"
```
