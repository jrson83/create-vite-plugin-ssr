export interface ITask {
  title: string
  task: () => Promise<void>
}

export interface IConfig {
  tsTaskList: Array<ITask>
  jsTaskList: Array<ITask>
}

export type CodeStyle = keyof IConfig

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined
      CODE_STYLE: CodeStyle
    }
  }
}
