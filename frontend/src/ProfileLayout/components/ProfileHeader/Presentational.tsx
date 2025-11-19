export type HeaderProps = {
  name: string
  nameJp: string
}

export const Presentational = ({ name, nameJp }: HeaderProps) => (
  <header className="mb-16 lg:mb-0">
    <h1 className="text-5xl font-bold text-slate-200 mb-2">{name}</h1>
    <p className="text-xl text-slate-400 mb-1">{nameJp}のスキルシート</p>
    <div className="mt-3 flex items-center gap-3">
      <img src="/favicon.ico" alt="Profile Icon" className="h-8 w-8 rounded" />
      <h2 className="text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
        沖縄在住のフロントエンド・エンジニア
      </h2>
    </div>
  </header>
)
