/**
 * Matches a file against an HTML `accept` attribute value.
 * Supports extensions (`.png`), MIME types (`image/png`), and wildcards (`image/*`).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
 */
export function isFileAccepted(file: File, accept: string): boolean {
  const tokens = accept.split(',').map((token) => token.trim()).filter(Boolean)

  if (!tokens.length) return true

  const fileName = file.name.toLowerCase()
  const fileType = file.type.toLowerCase()

  return tokens.some((token) => {
    const type = token.toLowerCase()

    if (type.startsWith('.')) {
      return fileName.endsWith(type)
    }

    if (type.endsWith('/*')) {
      const category = type.slice(0, -2)

      return fileType.startsWith(`${category}/`)
    }

    return fileType === type
  })
}
