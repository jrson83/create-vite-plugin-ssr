export { arrayRotate }

function arrayRotate<T>(input: T[], number: number) {
  const _input = [...input]
  number -= _input.length * Math.floor(number / _input.length)
  _input.push.apply(_input, _input.splice(0, number))
  return _input
}

// https://stackoverflow.com/a/33451102

/* const immutatableArrayRotate = <T>(input: T, number: number) => arrayRotate(input.clone() as any, number) */
