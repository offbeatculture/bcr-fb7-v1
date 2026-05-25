import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { COMPONENTS } from '../data/content.js';

export default function Inside() {
  return (
    <section id="inside" className="relative py-24 sm:py-32 bg-cream-50">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-900/15 to-transparent" />

      <div className="max-shell container-px">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">Inside the masterclass</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] mt-4">
              Three components.<br /> <span className="italic text-rose-saree">One complete reset.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6 lg:gap-7">
          {COMPONENTS.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl bg-cream-100 ring-1 ring-ink-900/8 p-8 sm:p-9 overflow-hidden hover:bg-cream-50 hover:shadow-[0_30px_60px_-30px_rgba(19,17,14,0.3)] transition-all duration-500"
            >
              {/* number watermark */}
              <span
                aria-hidden
                className="absolute -top-6 -right-2 font-display text-[140px] leading-none text-ink-900/[0.04] select-none group-hover:text-teal-deep/10 transition-colors duration-700"
              >
                {c.n}
              </span>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-teal-deep">{c.tag}</span>
                <span className="h-px flex-1 bg-ink-900/10" />
              </div>

              <h3 className="font-display text-[26px] sm:text-[28px] mt-5 leading-tight text-ink-900">
                {c.title}
              </h3>

              <p className="font-sans text-ink-700 mt-4 text-[15px] leading-relaxed">
                {c.body}
              </p>

              <div className="mt-6 pt-5 border-t border-ink-900/10">
                <p className="font-display italic text-[17px] text-teal-deep">
                  {c.promise}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <a href="#register" className="btn-primary">
              I Want This Transformation - ₹99 →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
