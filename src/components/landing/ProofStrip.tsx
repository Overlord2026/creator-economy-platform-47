import { landing } from '../../data/landing';

export default function ProofStrip(){
  const quotes = landing.quotes;
  const metrics = landing.metrics;
  return (
    <section aria-label="Proof" className="mt-6">
      <div className="grid gap-6 md:grid-cols-2">
        {quotes.map((q,i)=>(
          <blockquote key={i} className="text-white/90">
            <p className="text-lg leading-snug">{q.q}</p>
            <footer className="text-white/60 mt-2">— {q.by}</footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m,i)=>(
          <div key={i} className="rounded-md border border-white/10 px-3 py-2">
            <div className="text-white/90 font-semibold">{m.v}</div>
            <div className="text-white/60 text-sm">{m.k}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
