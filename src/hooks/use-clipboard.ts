import { useState, useCallback } from 'react'

export function useClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setHasCopied(true)
      setTimeout(() => {
        setHasCopied(false)
      }, timeout)
    })
  }, [timeout])

  return { onCopy, hasCopied }
}

