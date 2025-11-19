import { useEffect, useRef, useState } from 'react'
import type { Profile } from '../api/Profile'
import { fetchProfile } from '../api/fetchProfile'

export type UseProfileState =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: Profile; error: null }
  | { status: 'error'; data: null; error: Error }

const initial: UseProfileState = {
  status: 'idle',
  data: null,
  error: null
}

const load = async ({
  setState,
  canceled
}: {
  setState: React.Dispatch<React.SetStateAction<UseProfileState>>
  canceled: React.RefObject<boolean>
}) => {
  if (canceled.current) return
  setState({ status: 'loading', data: null, error: null })
  try {
    const profile = await fetchProfile()
    setState({ status: 'success', data: profile, error: null })
  } catch (e) {
    const error =
      e instanceof Error ? e : new Error('プロフィール取得に失敗しました')
    setState({ status: 'error', data: null, error })
  } finally {
    canceled.current = true
  }
}

export const useProfile = (): UseProfileState => {
  const [state, setState] = useState<UseProfileState>(initial)
  const canceled = useRef(false)

  useEffect(() => {
    load({ setState, canceled })
  }, [])

  return state
}
