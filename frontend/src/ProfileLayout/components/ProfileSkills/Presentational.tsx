export type SkillsProps = {
  skills: string[]
  operatingSystems: string[]
}

export const Presentational = ({ skills, operatingSystems }: SkillsProps) => (
  <section className="mb-16">
    <h3 className="text-lg font-medium text-slate-300 mb-3">保有技能</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-md text-sm border border-slate-700"
        >
          {skill}
        </span>
      ))}
    </div>
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-300 mb-3">使用OS</h3>
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
