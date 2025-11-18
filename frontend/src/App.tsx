import './App.css'
import { useProfile } from './hooks/useProfile'

const App = () => {
  const state = useProfile()
  if (state.status === 'loading' || state.status === 'idle')
    return <p>プロフィールを読み込み中です…</p>
  if (state.status !== 'success')
    return (
      <p style={{ color: 'red' }}>
        プロフィールの取得に失敗しました: {state.error.message}
      </p>
    )
  const data = state.data
  return (
    <>
      <h1 style={{ marginBottom: 4 }}>{data.name}</h1>
      <p style={{ margin: 0, color: '#666' }}>{data.headline}</p>
      <p style={{ margin: 0, color: '#666' }}>
        {data.location} / リモート:
        {data.remote ? '可' : '不可'}
      </p>

      <section style={{ marginTop: 24 }}>
        <h2>職務要約</h2>
        <p>{data.summary}</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>主なスキル</h2>
        <ul>
          {data.skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      {data.recentProject && (
        <section style={{ marginTop: 24 }}>
          <h2>直近のプロジェクト</h2>
          <p style={{ fontWeight: 'bold' }}>{data.recentProject.title}</p>
          <p>{data.recentProject.period}</p>
          <p>使用技術:</p>
          <ul>
            {data.recentProject.techStack.map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default App
