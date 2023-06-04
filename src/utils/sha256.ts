export async function sha256(s: string): Promise<string> {
  const encoder = new TextEncoder()
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(s))
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
}
