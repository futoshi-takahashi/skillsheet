import type { Profile } from './Profile'

const API_BASE = 'https://www.emotional.jp/demo/api/'

export const fetchProfile = async (): Promise<Profile> => {
  const res = await fetch(`${API_BASE}/profile.php`, {
    headers: {
      Accept: 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error(`プロフィール取得に失敗しました(status=${res.status})`)
  }

  const data = (await res.json()) as Profile
  return data
}
