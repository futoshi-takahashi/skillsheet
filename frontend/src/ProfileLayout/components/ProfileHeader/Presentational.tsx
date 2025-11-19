export type HeaderProps = {
  name: string
  nameJp: string
  furigana: string
}

export const Presentational = ({ name, nameJp, furigana }: HeaderProps) => (
  <header className="mb-16 lg:mb-0">
    <h1 className="text-5xl font-bold text-slate-200 mb-2">{name}</h1>
    <p className="text-sm text-slate-500">{furigana}</p>
    <p className="text-xl text-slate-400 mb-1">{nameJp}</p>
    <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
      沖縄在住のフロントエンド・エンジニア
    </h2>
  </header>
)
