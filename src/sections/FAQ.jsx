import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { FAQS } from '../data/content.js';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-cream-100">
      <div className="max-shell container-px">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Honest answers</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] mt-4">
                Before you <span className="italic text-teal-deep">commit.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-ink-700 mt-6 text-[16px] leading-relaxed max-w-md">
                Most questions we get, answered plainly. If something else is on your mind,
                bring it into the session itself.
              </p>
            </Reveal>
          </div>

          <ul className="divide-y divide-ink-900/10 border-y border-ink-900/10">
            {FAQS.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-deep rounded-md"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="font-display text-[19px] sm:text-[22px] text-ink-900 leading-snug pr-2">
                      {f.q}
                    </span>
                    <span
                      className={`mt-1.5 h-8 w-8 flex-shrink-0 rounded-full grid place-items-center transition-all duration-500 ${
                        isOpen ? 'bg-teal-deep text-cream-50 rotate-45' : 'bg-cream-50 text-ink-900 ring-1 ring-ink-900/15 group-hover:bg-cream-100'
                      }`}
                      aria-hidden
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-ink-700 text-[15px] sm:text-[16px] leading-relaxed pb-6 pr-12 max-w-2xl">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
