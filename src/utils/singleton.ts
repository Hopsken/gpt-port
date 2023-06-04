export const singletonSync = <T>(id: string, fn: () => T) => {
  const globalThisForKey = globalThis as unknown as { [x: string]: T }
  if (!globalThisForKey[id]) {
    globalThisForKey[id] = fn()
  }
  return globalThisForKey[id]
}
