import { ProfileHeader } from './components/ProfileHeader'
import { ProfileSummary } from './components/ProfileSummary'
import { ProfileSkills } from './components/ProfileSkills'
import {
  ProfileWorkHistory,
  type WorkHistoryProps
} from './components/ProfileWorkHistory'
import { ProfileFooter } from './components/ProfileFooter'
import type { HeaderProps } from './components/ProfileHeader/Presentational'
import type { SummaryProps } from './components/ProfileSummary/Presentational'
import type { SkillsProps } from './components/ProfileSkills/Presentational'

type Props = {
  header: HeaderProps
  summary: SummaryProps
  skills: SkillsProps
  workHistory: WorkHistoryProps
}

export const Presentational = ({
  header,
  summary,
  skills,
  workHistory
}: Props) => (
  <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:px-24 lg:py-0">
    <div className="lg:flex lg:justify-between lg:gap-4">
      {/* ヘッダーセクション - lg以上で左側固定 */}
      <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
        <ProfileHeader {...header} />
      </div>

      {/* メインコンテンツ - lg以上で右側スクロール */}
      <div className="lg:w-1/2 lg:py-24">
        <ProfileSummary {...summary} />
        <ProfileSkills {...skills} />
        <ProfileWorkHistory {...workHistory} />
        <ProfileFooter />
      </div>
    </div>
  </div>
)
