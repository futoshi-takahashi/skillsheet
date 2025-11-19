import { Presentational } from './Presentational'
import { calculateDuration } from './utils/calculateDuration'

type WorkHistoryItem = {
  startDate: string
  endDate: string
  title: string
  details: string[]
  phases: string[]
  languages: string[]
}

export type Props = {
  items: WorkHistoryItem[]
}

const formatDate = (dateStr: string): string => {
  const [year, month] = dateStr.split('-')
  return `${year}年${month}月`
}

const formatDuration = (startDate: string, endDate: string): string => {
  const [startYear, startMonth] = startDate.split('-').map(Number)
  const [endYear, endMonth] = endDate.split('-').map(Number)

  const duration = calculateDuration(startYear, startMonth, endYear, endMonth)

  const parts: string[] = []

  if (duration.years !== undefined) {
    parts.push(`${duration.years}年`)
  }

  if (duration.months !== undefined) {
    parts.push(`${duration.months}ヶ月`)
  }

  return parts.join('')
}

export const Container = ({ items }: Props) => {
  const sortedItems = [...items]
    .sort((a, b) => {
      // endDateで降順（新しいものが上）
      return b.endDate.localeCompare(a.endDate)
    })
    .map(item => {
      const duration = formatDuration(item.startDate, item.endDate)
      return {
        period: `${formatDate(item.startDate)}〜${formatDate(item.endDate)}（${duration}）`,
        title: item.title,
        details: item.details,
        phases: item.phases,
        languages: item.languages
      }
    })

  return <Presentational items={sortedItems} />
}
