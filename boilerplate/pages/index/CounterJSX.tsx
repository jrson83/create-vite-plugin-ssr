let useState: <S>(initialState: any) => S

if (import.meta.env.VITE_APP_FRAMEWORK === 'Preact') {
  useState = (await import('preact/hooks')).useState
}

if (import.meta.env.VITE_APP_FRAMEWORK === 'React') {
  useState = (await import('react')).useState
}

export { Counter }

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button type="button" onClick={() => setCount((count: number) => count + 1)}>
      Counter {count}
    </button>
  )
}
