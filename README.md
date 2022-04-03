# minepkg crash test GitHub action

This action crash tests a minepkg package.

## Usage

Here's an example to crash test a package using the latest possible version listed in your `minepkg.toml` file (`requirements.minecraft`).

```yaml
name: 'crash test on push'
on: 
  pull_request:
  push:

jobs:
  crash-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: minepkg/action-crash-test@main
        with:
          working-directory: '/' # optional
          # minecraft: 1.18.2 # optional
```

## `with` input parameters explained

- **`working-directory`**: The directory where the minepkg.toml is located. (Default: root directory)
- **`minecraft`**: Which Minecraft version to use when testing the package. Defaults to whatever is set for **requirements.minecraft** in the **minepkg.toml**
- **`no-build:`**: Use **true** if you've already built the project to speed up the time it takes for the action to finish. (Default: false)
- **`cli-version`**: Which version of the minepkg client to use. Defaults to the latest.

## Matrix Job Setup

The following job will test a package on multiple Minecraft versions.
Make sure to double check the indentation.

```yaml
crash-test-on-multiple-versions:
  runs-on: ubuntu-latest
  strategy:
    fail-fast: false
    matrix:
      minecraft: [1.15.2, 1.16.5, 1.17.1, 1.18.2]
  steps:
    - uses: actions/checkout@v2
    - uses: minepkg/action-crashtest@main
      with:
        minecraft: ${{ matrix.minecraft }}
```