# create-vite-plugin-ssr

pnpm monorepo for scaffolding [vite-plugin-ssr](https://vite-plugin-ssr.com/) boilerplates.

## Included Workspaces

- @create-vite-plugin-ssr/boilerplate
  - UI package for developing @vite-plugin-ssr boilerplates
- @create-vite-plugin-ssr/cli
  - CLI package for installing @vite-plugin-ssr boilerplates
- @create-vite-plugin-ssr/generator
  - Generator package for scaffolding @vite-plugin-ssr boilerplates
- @create-vite-plugin-ssr/templates
  - Template package with generated @vite-plugin-ssr boilerplates

## Included UI Frameworks

- [Preact](https://preactjs.com/)
- [React](https://reactjs.org/)
- [Vue](https://vuejs.org/)

## Installation

```sh
$ git clone https://github.com/jrson83/create-vite-plugin-ssr.git

$ cd create-vite-plugin-ssr/

$ pnpm install
```

You can open the project as workspace with `.vscode/create-vite-plugin-ssr.code-workspace`

## Usage

### Available commands:

Cleanup

```sh
// clean all node_modules folders
$ pnpm run clean:modules

// clean cli bin folder
$ pnpm run clean:cli

// clean generated templates
$ pnpm run clean:templates
```

Prettier

```sh
// prettier check
$ pnpm run format:check

// run prettier
$ pnpm run format
```

Development

```sh
// developing the cli
$ pnpm run dev:cli

// developing the boilerplates
$ pnpm run dev:preact|react|vue
```

Build

```sh
// build the cli
$ pnpm run dev:cli

// build typescript templates
$ pnpm run build:ts

// build javascript templates (ts templates must exist)
$ pnpm run build:js
```

# Todo

- [ ] Update boilerplate to vps 0.4
- [x] Restructure workspaces [#4](https://github.com/jrson83/create-vite-plugin-ssr/issues/4)
- [x] Restructure boilerplate
- [ ] Restructure cli
- [ ] Integrate boilerplate features for CLI `selectOptions`
- [ ] Implement generator for those features
- [x] Generator for templates `typescript` & `javascript` (detype)
- [x] Optimize .gitignore & .npmignore files
- [ ] Optimize boilerplate dependencies
- [ ] Integrate updater for boilerplate dependencies
- [ ] Fix annoying `package` folder popup in VS Code
- [ ] Code cleanup
