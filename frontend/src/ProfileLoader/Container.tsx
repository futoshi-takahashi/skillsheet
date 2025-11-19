import { useProfile } from '../hooks/useProfile'
import { LoadingUI, ErrorUI } from './Presentational'
import { ProfileLayout } from '../ProfileLayout'

export const Container = () => {
  const state = useProfile()

  if (state.status === 'loading' || state.status === 'idle') {
    return <LoadingUI />
  }

  if (state.status === 'error') {
    return <ErrorUI message={state.error.message} />
  }

  return <ProfileLayout profile={state.data} />
}
