import { useState } from 'react'
import { createC2pa } from 'c2pa'
import { parseC2PAResult } from '../utils/c2paHelper'

export function useC2PA() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const analyzeImage = async (file) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const c2pa = await createC2pa()
      const arrayBuffer = await file.arrayBuffer()

      const result = await c2pa.read(arrayBuffer)

      if (result.manifest) {
        const parsed = parseC2PAResult(result.manifest)
        setResult(parsed)
      } else {
        setResult({ status: 'no_metadata', details: null })
      }
    } catch (err) {
      setError(err.message)
      setResult({ status: 'error', details: null })
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
    setLoading(false)
  }

  return { loading, result, error, analyzeImage, reset }
}
