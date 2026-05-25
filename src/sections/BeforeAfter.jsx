import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { BEFORE_AFTER } from '../data/content.js';

export default function BeforeAfter() {
  return (
    <section className="relative py-24 sm:py-32 bg-cream-100">
      <div className="max-shell container-px">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">In one session</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] mt-4">
              From tight, exhausted, unsettled - <br className="hidden sm:block" />
              to the one signal your body has been waiting for.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 rounded-3xl overflow-hidden ring-1 ring-ink-900/10 bg-cream-50">
          {/* header row */}
          <div className="grid grid-cols-2 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] border-b border-ink-900/10">
            <div className="px-6 sm:px-8 py-4 text-ink-700 bg-cream-100/60">Before</div>
            <div className="px-6 sm:px-8 py-4 text-teal-deep bg-teal-mist/40">After</div>
          </div>

          <ul>
            {BEFORE_AFTER.map((row, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="grid grid-cols-2 border-b border-ink-900/8 last:border-b-0 group"
              >
                <div className="px-6 sm:px-8 py-5 sm:py-6 text-ink-700 font-sans text-[15px] sm:text-[16px] leading-relaxed bg-cream-50">
                  <span className="inline-flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink-500" aria-hidden />
                    {row.before}
                  </span>
                </div>
                <div className="px-6 sm:px-8 py-5 sm:py-6 text-ink-900 font-sans text-[15px] sm:text-[16px] leading-relaxed bg-teal-mist/20 group-hover:bg-teal-mist/40 transition-colors">
                  <span className="inline-flex items-center gap-3">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 text-teal-deep flex-shrink-0" aria-hidden>
                      <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {row.after}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
