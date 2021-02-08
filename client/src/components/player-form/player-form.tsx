import { Input } from '@components'
import { IPath } from '@interfaces'
import type { Movement } from '@types'
import { useRef, useState, useEffect, useCallback } from 'react'

import './player-form.css'

export const PlayerForm: React.FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [gameResult, setGameResult] = useState<string | null>(null)

  const tryPath = useCallback(async (path: IPath): Promise<void> => {
    try {
      setError(null)
      setLoading(true)

      const response = await fetch('http://localhost:9000/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      })

      const data = await response.json()

      setGameResult(data.message)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const submit = useCallback(async (): Promise<void> => {
    if (inputRef.current) {
      setGameResult('')
      const { value } = inputRef.current

      inputRef.current.value = ''

      const normalizedValue = value.trim().toLowerCase()

      if (isValid(normalizedValue)) {
        const path: IPath = { movements: normalizedValue.split(',') as Movement[] }

        await tryPath(path)
      } else {
        setError(new Error('Invalid path'))
      }
    }
  }, [tryPath])

  const isValid = (value: string): boolean => {
    const POSSIBLE_MOVEMENTS = ['n', 'e', 's', 'w']
    const movements = value.split(',')

    for (let i = 0; i < movements.length; i += 1) {
      if (!POSSIBLE_MOVEMENTS.includes(movements[i])) {
        return false
      }
    }

    return true
  }

  const onKeyDown = useCallback(
    async (e: KeyboardEvent): Promise<void> => {
      if (e.key === 'Enter') {
        submit()
      }
    },
    [submit]
  )

  useEffect(() => {
    let input: HTMLInputElement | null = null

    if (inputRef.current) {
      input = inputRef.current

      input.focus()

      input.addEventListener('keydown', onKeyDown)
    }

    return () => {
      if (input) {
        input.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [inputRef, onKeyDown])

  return (
    <>
      <h2>Possible cardinal values are N/E/S/W</h2>

      <p>
        Type cardinal direction values separated by comma and then press Enter or click the submit
        button.
      </p>

      <div>
        <Input
          ref={inputRef}
          name="player-input"
          labelText="Path"
          placeholder="Eg. n,n,w,e"
          style={{ width: '200px' }}
        ></Input>

        <button onClick={submit}>Submit</button>

        <div className="outcome-container">
          {loading && <div>Loading...</div>}
          {gameResult && <div>{gameResult}</div>}
          {error && <div className="error">Error: {error.message}</div>}
        </div>
      </div>
    </>
  )
}

export default PlayerForm
