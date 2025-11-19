import { Presentational } from './Presentational'

type Props = {
  skills: string[]
  operatingSystems: string[]
}

export const Container = ({ skills, operatingSystems }: Props) => (
  <Presentational skills={skills} operatingSystems={operatingSystems} />
)
