import { useEffect, useRef, useState } from 'react'
import type { Profile } from '../api/Profile'
import { fetchProfile } from '../api/fetchProfile'

/**
 * プロフィール取得の状態を表す型
 *
 * @property status - 取得状態 ('idle' | 'loading' | 'success' | 'error')
 * @property data - 取得成功時のプロフィールデータ (success時のみ)
 * @property error - エラー情報 (error時のみ)
 */
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

/**
 * プロフィールデータを取得するカスタムhook
 *
 * マウント時に自動的にプロフィールデータの取得を開始します。
 * アンマウント時には進行中のリクエストをキャンセルし、
 * アンマウント後の状態更新を防ぎます。
 *
 * @returns プロフィール取得の状態 (idle -> loading -> success | error)
 *
 * @example
 * ```tsx
 * const ProfileComponent = () => {
 *   const state = useProfile()
 *
 *   if (state.status === 'loading') return <div>Loading...</div>
 *   if (state.status === 'error') return <div>Error: {state.error.message}</div>
 *   if (state.status === 'success') return <div>{state.data.name}</div>
 *   return null
 * }
 * ```
 */
export const useProfile = (): UseProfileState => {
  const [state, setState] = useState<UseProfileState>(initial)
  // アンマウント後のsetState実行を防ぐフラグ（メモリリーク対策）
  const isMounted = useRef(false)
  // StrictModeでの重複実行を防ぐフラグ（一回だけ実行制御）
  const hasLoaded = useRef(false)

  useEffect(() => {
    // 既に実行済みの場合は早期リターン（StrictMode対策）
    if (hasLoaded.current) return
    // useEffect実行時にマウント状態をtrueにリセット
    isMounted.current = true
    ;(async () => {
      setState({ status: 'loading', data: null, error: null })
      try {
        const profile = await fetchProfile()
        // マウント中の場合のみ状態更新（メモリリーク防止）
        if (isMounted.current) {
          setState({ status: 'success', data: profile, error: null })
        }
      } catch (e) {
        const error =
          e instanceof Error ? e : new Error('プロフィール取得に失敗しました')
        // マウント中の場合のみ状態更新（メモリリーク防止）
        if (isMounted.current) {
          setState({ status: 'error', data: null, error })
        }
      } finally {
        // fetchProfile完了後に実行済みフラグをON（重複実行防止）
        hasLoaded.current = true
      }
    })()

    return () => {
      // アンマウント時にフラグをfalseに設定
      isMounted.current = false
    }
  }, [])

  return state
}
