import { Presentational } from './Presentational'

type Props = {
  items: string[]
}

export const Container = ({ items }: Props) => <Presentational items={items} />
