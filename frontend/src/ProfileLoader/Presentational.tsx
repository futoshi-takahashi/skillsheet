export const LoadingUI = () => <p>プロフィールを読み込み中です…</p>

export const ErrorUI = ({ message }: { message: string }) => (
  <p style={{ color: 'red' }}>プロフィールの取得に失敗しました: {message}</p>
)

export const SuccessUI = ({ data }: { data: unknown }) => (
  <>{JSON.stringify(data)}</>
)
