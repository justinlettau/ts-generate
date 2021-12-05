[![NPM Version](https://badge.fury.io/js/ts-generate.svg)](https://badge.fury.io/js/ts-generate)
[![CI](https://github.com/justinlettau/ts-generate/workflows/CI/badge.svg)](https://github.com/justinlettau/ts-generate/actions)
[![codecov](https://codecov.io/gh/justinlettau/ts-generate/branch/master/graph/badge.svg)](https://codecov.io/gh/justinlettau/ts-generate)

# ts-generate

CLI to generate TypeScript interfaces from source files.

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

# Features

- 💪 Generate **TypeScript** files (obviously).
- 🚀 **Configure** output to match your project structure.

# Installation

```bash
npm install -g ts-generate
```

# Usage

```bash
ts-generate --help
```

### `class-to-interface [glob]`

Generate interfaces from existing TypeScript classes

```
ts-generate class-to-interface src/entities/*.ts
```

Options:

| Option             | Type     | Description                                 | Default |
| ------------------ | -------- | ------------------------------------------- | ------- |
| `--prefix`         | `string` | Interface name prefix.                      | n/a     |
| `--suffix`         | `string` | Interface name suffix.                      | n/a     |
| `--fileNameCasing` | `string` | Output file name casing.                    | n/a     |
| `--outDir`         | `string` | Redirect output structure to the directory. | n/a     |

# Development

Clone the repo and run the following commands in the `ts-generate` directory:

```bash
npm install
npm link
npm run build
```
