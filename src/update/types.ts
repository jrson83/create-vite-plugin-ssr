export interface PkgJson {
  [key: string]: [any][any]
}

export type PkgTemp = {
  dependencies: {
    [key: string]: any
  }
}

export type PkgUpdates = {
  [key: string]: any
}

export interface AppProps {
  pkgUpdates: PkgUpdates
}

export interface UpdateOptions {
  outputDir: string
  update: boolean
  dryRun: boolean
}
