export type Profile = {
  name: string
  summary: string
  headline: string
  location: string
  remote: boolean
  skills: string[]
  recentProject: {
    title: string
    period: string
    techStack: string[]
  } | null
}
