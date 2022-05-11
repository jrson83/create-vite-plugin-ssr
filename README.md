# create-vite-plugin-ssr

This is hard WIP!

pnpm monorepo with CLI & single-multi-framework-boilerplate

## Included UI Frameworks

- Preact
- React
- Vue

## Usage

Available commands:

```sh
$ git clone https://github.com/jrson83/create-vite-plugin-ssr.git

$ cd create-vite-plugin-ssr/

$ pnpm install

// cli
$ pnpm run dev:cli

// or
$ pnpm run build:cli

$ pnpm run preview:cli

// or
$ pnpm run prod:cli

// boilerplate
$ pnpm run dev:preact|react|vue
```

You can open the project as workspace with `.vscode/create-vite-plugin-ssr.code-workspace`

# Todo

- [ ] Error output if async build-action fails
- [ ] Implement generator for templates (UI Frameworks)
- [ ] Implement more selectOptions for the generator (e.g. Typescript)
- [x] Make `copyFiles` work with `config.copyFiles`
- [ ] Implement `detype`
- [ ] Implement package.json updater for boilerplates
- [ ] Testing and `targetDir` integration for `npx`
- [ ] Code cleanup
