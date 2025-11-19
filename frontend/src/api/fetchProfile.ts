import type { Profile } from './Profile'

const PROFILE_ENDPOINT =
  import.meta.env.VITE_PROFILE_ENDPOINT ??
  'https://emotional.jp/demo/api/profile.php'

export const fetchProfile = async (): Promise<Profile> => {
  const res = await fetch(PROFILE_ENDPOINT)

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status}`)
  }

  return res.json() as Promise<Profile>
}
