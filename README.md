<div style="display: flex; margin: 10px 0 20px">
  <img align="left" width="100" src="./assets/crashtest-logo.svg" alt="minepkg" style="margin-right: 20px; align-self: center"/>
  <div>
    <h1 style="margin-top: 0; font-size: 28px; text-decoration: none">minepkg crash test GitHub action</h1>
    <p>This action crash tests a minepkg package.</p>
  </div>
</div>


## Usage

To get this minimal example running, you'll need to have a `minepkg.toml` file [in your repository](https://minepkg.io/docs/install).
You can then create the following file as `.github/workflows/crash-test.yml` to get the action running:

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
        # This step is only needed if you need to build a mod
      - name: Set up JDK 1.17
        uses: actions/setup-java@v2
        with:
          distribution: 'adopt'
          java-version: 17
      - uses: minepkg/action-crash-test@v0
        with:
          working-directory: '/' # optional
          # minecraft: 1.19.3 # optional
```

This action will crash test your package using the latest possible version listed you specified for `requirements.minecraft` in your `minepkg.toml` file.

## `with` input parameters explained

- **`working-directory`**: The directory where the minepkg.toml is located. (Default: root directory)
- **`minecraft`**: Minecraft version to use when testing the package. Defaults to whatever is set for **requirements.minecraft** in the **minepkg.toml**
- **`no-build:`**: Use **true** if you've already built the project to speed up the time it takes for the action to finish. (Default: false)
- **`cli-version`**: Version of the minepkg client to use. Defaults to the latest.

## Matrix Job Setup

The following job will test a package on multiple Minecraft versions.
Make sure to double check the indentation.

**Note:** This job depends on another job called `build` to upload the jars as artifacts first!
You can [view a full example here](https://github.com/minepkg/companion-fabric/blob/main/.github/workflows/build-and-test.yml).

```yaml
crash-test:
  runs-on: ubuntu-latest
  needs: build
  strategy:
    fail-fast: false
    matrix:
      minecraft: [1.15.2, 1.16.5, 1.17.1, 1.18.2, 1.19.3]
  steps:
    - uses: actions/checkout@v2
    - name: Download Artifacts
      uses: actions/download-artifact@v2
      with:
        name: jars
        path: build/libs
    - uses: minepkg/action-crash-test@v0
      with:
        minecraft: ${{ matrix.minecraft }}
        no-build: true
```
