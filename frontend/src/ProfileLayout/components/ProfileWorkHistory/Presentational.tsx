export type WorkHistoryItemProps = {
  period: string
  title: string
  details: string[]
  phases: string[]
  languages: string[]
}

export type WorkHistoryProps = {
  items: WorkHistoryItemProps[]
}

export const Presentational = ({ items }: WorkHistoryProps) => (
  <section>
    <h2 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center">
      <span className="text-cyan-400 mr-2">03.</span>
      Work History
    </h2>
    <div className="space-y-12">
      {items.map((work, index) => (
        <div
          key={index}
          className="border-l-2 border-cyan-400 pl-6 pb-8 last:pb-0"
        >
          <div className="mb-4">
            <p className="text-sm text-slate-500 mb-2">{work.period}</p>
            <h3 className="text-xl font-medium text-slate-200 mb-3">
              {work.title}
            </h3>
          </div>
          <div className="space-y-2 text-slate-400 mb-4">
            {work.details.map((detail, idx) => (
              <p key={idx} className="text-sm leading-relaxed">
                {detail}
              </p>
            ))}
          </div>
          <div className="mb-3">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Phases</h4>
            <div className="flex flex-wrap gap-2">
              {work.phases.map((phase, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-800/30 text-slate-400 rounded text-xs border border-slate-700/50"
                >
                  {phase}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {work.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-800/30 text-cyan-300 rounded text-xs border border-slate-700/50"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)
