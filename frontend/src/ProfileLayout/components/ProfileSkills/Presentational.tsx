export type SkillsProps = {
  skills: string[]
  operatingSystems: string[]
}

export const Presentational = ({ skills, operatingSystems }: SkillsProps) => (
  <section className="mb-16">
    <h2 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center">
      <span className="text-cyan-400 mr-2">02.</span>
      Skills
    </h2>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-slate-800 text-cyan-400 rounded-md text-sm font-medium border border-slate-700"
        >
          {skill}
        </span>
      ))}
    </div>
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-300 mb-3">
        Operating Systems
      </h3>
      <div className="flex flex-wrap gap-3">
        {operatingSystems.map((os, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-md text-sm border border-slate-700"
          >
            {os}
          </span>
        ))}
      </div>
    </div>
  </section>
)
