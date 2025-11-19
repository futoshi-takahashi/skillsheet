import { useProfile } from '../hooks/useProfile'
import { LoadingUI, ErrorUI, SuccessUI } from './Presentational'

export const Container = () => {
  const state = useProfile()

  if (state.status === 'loading' || state.status === 'idle') {
    return <LoadingUI />
  }

  if (state.status === 'error') {
    return <ErrorUI message={state.error.message} />
  }

  return <SuccessUI data={state.data} />
}
