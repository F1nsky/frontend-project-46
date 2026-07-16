# Difference Finder

[![Actions Status](https://github.com/F1nsky/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/F1nsky/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/727434c725ea78375da8/maintainability)](https://codeclimate.com/github/F1nsky/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/727434c725ea78375da8/test_coverage)](https://codeclimate.com/github/F1nsky/frontend-project-46/test_coverage)

A command-line utility that compares two configuration files and presents the difference in a readable format. The project demonstrates recursive data processing, parsing, output formatting, automated testing, and CLI design in JavaScript.

## Features

- compares JSON, YAML, and INI files;
- handles flat and deeply nested structures;
- provides stylish, plain-text, and JSON output formats;
- separates parsing, diff construction, and formatting into independent modules;
- includes automated Jest tests and fixture-based scenarios.

## Installation

Requirements: Node.js and npm.

```bash
git clone https://github.com/F1nsky/frontend-project-46.git
cd frontend-project-46
npm install
npm link
```

## Usage

```bash
gendiff [options] <filepath1> <filepath2>
```

Compare two files using the default stylish formatter:

```bash
gendiff before.json after.json
```

Choose a different output format:

```bash
gendiff --format plain before.yml after.yml
gendiff --format json before.ini after.ini
```

| Format | Purpose |
|---|---|
| `stylish` | Human-readable tree representation (default) |
| `plain` | Concise description of changed properties |
| `json` | Machine-readable serialized diff |

## Development

```bash
make test           # run the Jest suite
make test-coverage  # collect coverage
make lint           # run ESLint
make build          # create the distribution build
```

## Architecture

```text
src/
  parsers/       JSON, YAML, and INI parsing
  formatters/    stylish, plain, and JSON output
  diffBuilder.js recursive comparison engine
  index.js       public application interface
  bin/            command-line entry point
__tests__/        tests and input/output fixtures
```

## Learning demos

- [Basic file comparison](https://asciinema.org/a/JchjuoutF7HcX9POojX6f2YGD)
- [Nested structures](https://asciinema.org/a/6m3j2uLS8csm0JDXeC2r6KdRo)
- [Plain formatter](https://asciinema.org/a/AiqcatebaQEncYBvmKbLTYMYl)
- [JSON formatter](https://asciinema.org/a/Ej9LVsdDRNRZ1N2rfohusZoEm)
