import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { TESTIMONIALS } from '../data/content.js';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[i];

  return (
    <section id="voices" className="relative py-24 sm:py-32 bg-cream-50 overflow-hidden">
      <div className="max-shell container-px">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">Words from the room</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] mt-4">
              People who were exactly <br />
              <span className="italic text-teal-deep">where you are right now.</span>
            </h2>
          </Reveal>
        </div>

        {/* Featured rotating quote */}
        <div
          className="relative mt-12 rounded-3xl bg-cream-100 ring-1 ring-ink-900/8 p-8 sm:p-12 lg:p-16 min-h-[260px] sm:min-h-[300px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg
            aria-hidden
            className="absolute top-8 left-8 h-12 w-12 text-teal-deep/15"
            viewBox="0 0 32 32" fill="currentColor"
          >
            <path d="M10 8C6 8 4 11 4 15v9h9V15H7c0-3 1.5-4 3-4V8zm15 0c-4 0-6 3-6 7v9h9V15h-6c0-3 1.5-4 3-4V8z" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="relative pl-0 sm:pl-20"
            >
              <blockquote className="font-display text-[22px] sm:text-[28px] lg:text-[32px] leading-snug text-ink-900">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-6 font-sans text-[14px] text-ink-700 tracking-tight">
                - <span className="font-semibold text-ink-900">{current.name}</span>
                <span className="text-ink-500"> · {current.meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* dots */}
          <div className="absolute bottom-6 right-6 flex items-center gap-1.5" role="tablist" aria-label="Choose a testimonial">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={idx === i}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-deep ${
                  idx === i ? 'w-6 bg-teal-deep' : 'w-1.5 bg-ink-900/20 hover:bg-ink-900/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Marquee strip of additional names */}
        <div
          ref={trackRef}
          className="mt-10 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex gap-3 whitespace-nowrap animate-marquee" style={{ width: 'max-content' }}>
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-3 rounded-full bg-cream-100 ring-1 ring-ink-900/8 px-4 py-2 text-[13px] font-sans text-ink-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-saree" aria-hidden />
                <span className="font-semibold text-ink-900">{t.name}</span>
                <span className="text-ink-500">{t.meta}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
