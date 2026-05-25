import Reveal from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
import { STATS } from '../data/content.js';

export default function StatsBand() {
  return (
    <section className="relative bg-ink-900 text-cream-50 py-20 sm:py-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-[0.18] bg-grain pointer-events-none" />
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 h-[460px] w-[860px] rounded-full bg-teal-deep/40 blur-3xl" />

      <div className="max-shell container-px relative">
        <Reveal>
          <p className="eyebrow !text-gold">The room speaks</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(1.9rem,4vw,3rem)] mt-4 max-w-2xl">
            Real results from real sessions.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-cream-50/15">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="px-0 sm:px-8 first:pl-0 last:pr-0 py-8 sm:py-0">
              <div>
                <div className="font-display text-[clamp(3rem,7vw,5.6rem)] leading-none text-cream-50">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="font-sans text-cream-50/75 mt-4 text-[15px] max-w-[260px] leading-relaxed">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
