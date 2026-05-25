import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { PAIN_POINTS } from '../data/content.js';

const LOOP_KILLERS = [
  'My mind won’t switch off - even when everything is fine',
  'My gut has been unsettled for so long',
  'Bloating, acidity is a constant in my life',
  'This tightness has just become my normal',
];

export default function PainPoints() {
  return (
    <section id="problem" className="relative bg-cream-50 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-900/15 to-transparent" />

      <div className="max-shell container-px">
        {/* Loop-killer quotes - visceral voice of the customer */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <Reveal>
            <p className="eyebrow justify-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-saree animate-pulse" />
              The thoughts you live with
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)] mt-5 text-ink-900">
              You’ve said this to yourself.
              <br />
              <span className="italic text-teal-deep">Probably more than once.</span>
            </h2>
          </Reveal>

          <ul className="mt-10 flex flex-col gap-3 sm:gap-3.5 items-stretch max-w-2xl mx-auto">
            {LOOP_KILLERS.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={i % 2 === 0 ? 'self-start' : 'self-end'}
              >
                <motion.div
                  className="inline-block font-serif text-[16px] sm:text-[18px] text-ink-900 bg-cream-100 ring-1 ring-ink-900/10 rounded-2xl px-5 py-3.5 shadow-sm"
                  animate={{
                    x: [0, -1.2, 1.5, -0.8, 1, 0],
                    y: [0, 0.8, -0.6, 0.4, -0.5, 0],
                    rotate: [0, -0.4, 0.5, -0.3, 0.3, 0],
                  }}
                  transition={{
                    duration: 3.5 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.25,
                  }}
                >
                  “{t}”
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow">Sound familiar?</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] mt-5 text-ink-900">
                Your body <br />
                <span className="italic text-teal-deep">never really </span>
                switches off.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-sans text-ink-700 mt-6 text-[16px] leading-relaxed max-w-md">
                If any of these are quietly true for you - this session is for you.
                You don’t need a diagnosis to know something isn’t right.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#register" className="btn-primary mt-8 !py-3 !px-6 text-[14px]">
                I'm Ready - Show Me How →
              </a>
            </Reveal>
          </div>

          <ol className="space-y-3 sm:space-y-4">
            {PAIN_POINTS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05} as="li">
                <article className="group relative card-soft p-6 sm:p-7 transition-all duration-500 hover:bg-cream-100 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-25px_rgba(19,17,14,0.35)]">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-[12px] text-teal-deep tracking-tight mt-1 tabular-nums">{p.n}</span>
                    <div>
                      <h3 className="font-display text-[20px] sm:text-[22px] text-ink-900">
                        {p.title}
                      </h3>
                      <p className="font-sans text-ink-700 mt-2 text-[15px] leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                  <span aria-hidden className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-rose-saree opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.1} as="li">
              <p className="font-display italic text-[22px] sm:text-[26px] text-ink-900 mt-6 px-2">
                Your body has been carrying this long enough. <span className="text-teal-deep not-italic font-normal">Let’s reset it together.</span>
              </p>
            </Reveal>
          </ol>
        </div>
      </div>
    </section>
  );
}

