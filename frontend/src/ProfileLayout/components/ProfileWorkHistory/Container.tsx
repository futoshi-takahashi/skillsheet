import { Presentational } from './Presentational'

type WorkHistoryItem = {
  period: string
  title: string
  details: string[]
  phases: string[]
  languages: string[]
}

type Props = {
  items: WorkHistoryItem[]
}

export const Container = ({ items }: Props) => <Presentational items={items} />
