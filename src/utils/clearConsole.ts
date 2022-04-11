export { clearConsole }

async function clearConsole() {
  await new Promise((resolve: any) => process.stdout.write('\x1b[2J', resolve))
  await new Promise((resolve: any) => process.stdout.write('\x1b[0f', resolve))
}
