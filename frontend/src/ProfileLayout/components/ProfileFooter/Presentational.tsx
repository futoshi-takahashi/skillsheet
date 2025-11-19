export type FooterProps = {
  createdDate: string
}

export const Presentational = ({ createdDate }: FooterProps) => (
  <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
    Created: {createdDate}
  </footer>
)
