import type { Profile } from '../api/Profile'
import { Presentational } from './Presentational'

type Props = {
  profile: Profile
}

export const Container = ({ profile }: Props) => {
  const headerProps = {
    name: profile.name,
    nameJp: profile.nameJp
  }

  const summaryProps = {
    items: profile.summary
  }

  const skillsProps = {
    skills: profile.skills,
    operatingSystems: profile.operatingSystems
  }

  const workHistoryProps = {
    items: profile.workHistory.map(work => ({
      startDate: work.startDate,
      endDate: work.endDate,
      title: work.title,
      details: work.details,
      phases: work.phases,
      languages: work.languages
    }))
  }

  const footerProps = {
    createdDate: profile.createdDate
  }

  return (
    <Presentational
      header={headerProps}
      summary={summaryProps}
      skills={skillsProps}
      workHistory={workHistoryProps}
      footer={footerProps}
    />
  )
}
