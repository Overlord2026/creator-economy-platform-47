import { landing } from '../../data/landing';

export default function SafeByDesign(){
  return (
    <section aria-label="Safe by design" className="mt-10">
      <h2 className="text-2xl font-semibold text-white mb-4">Safe by design</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {landing.trust.map((t,i)=>(
          <div key={i} className="rounded-lg border border-white/10 p-4">
            <div className="text-white font-medium">{t.title}</div>
            <div className="text-white/70 text-sm mt-1">{t.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
