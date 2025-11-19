export type SummaryProps = {
  items: string[]
}

export const Presentational = ({ items }: SummaryProps) => (
  <section className="mb-16">
    <h2 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center">
      <span className="text-cyan-400 mr-2">01.</span>
      Summary
    </h2>
    <div className="space-y-3 text-slate-400 leading-relaxed">
      {items.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  </section>
)
