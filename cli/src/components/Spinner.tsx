import React, { useEffect, useState } from 'react'
import { Text } from 'ink'

export { Spinner }

const Spinner = () => {
  const spinner = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
  const spinnerInterval = 80

  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((previousIndex) => (previousIndex == spinner.length - 1 ? 0 : previousIndex + 1))
    }, spinnerInterval)

    return () => {
      clearInterval(timer)
    }
  }, [spinner])

  return <Text>{spinner[index]}</Text>
}
