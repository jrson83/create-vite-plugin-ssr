export const frameworks = ['Preact', 'React', 'Vue'] as const

export type UnionOfArrayElements<ARR_T extends Readonly<unknown[]>> = ARR_T[number]

export type Frameworks = typeof frameworks[number]

export type Framework = Partial<Frameworks>

export type PreactNode = preact.ComponentChildren
