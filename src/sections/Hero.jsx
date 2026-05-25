import { motion } from 'framer-motion';
import BodyExperience from '../components/BodyExperience.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';
import { WORKSHOP } from '../data/content.js';
import { useWorkshop } from '../components/WorkshopContext.jsx';

export default function Hero() {
  const { date } = useWorkshop();
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-rose-soft/30 blur-3xl" />
        <div className="absolute top-40 -right-32 h-[560px] w-[560px] rounded-full bg-teal-mist/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-[0.35] mix-blend-multiply pointer-events-none" />
      </div>

      {/* (Racing thoughts now orbit the body inside BodyExperience, not behind copy) */}

      <div className="max-shell container-px pt-10 pb-20 sm:pt-16 sm:pb-28 lg:pb-32 relative">
        <div className="grid lg:grid-cols-[1.1fr_0.95fr] gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-deep animate-pulse" />
                3 Hour Masterclass · {date}
              </p>
            </motion.div>

            {/* === HEADLINE (verbatim from copy) === */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(2.2rem,5.4vw,4.4rem)] mt-6 text-ink-900"
            >
              From{' '}
              <span className="italic text-ink-700/85">tight body, broken sleep, poor gut, and racing mind</span>
              <span className="mx-2 sm:mx-3 inline-flex items-center align-middle text-teal-deep">
                <ArrowFlow />
              </span>
              <span className="relative inline-block">
                <mark className="bg-transparent text-teal-deep">
                  To a body that isn’t fighting anymore.
                </mark>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden
                >
                  <motion.path
                    d="M2 8 Q 50 -2 100 6 T 198 6"
                    fill="none" stroke="#C7995A" strokeWidth="2.4" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 1.0, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans text-[17px] sm:text-[18px] text-ink-700 mt-7 max-w-[580px] leading-relaxed"
            >
              Learn the <strong className="text-ink-900">Breath Chakra Reset</strong> - the
              3-Zone body release system that finds exactly where your body is holding the
              tension, and releases it.
            </motion.p>

            {/* (Loop-killer quotes now live in PainPoints section, where they belong) */}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#register" className="btn-primary group">
                Yes! I Want This - Only ₹{WORKSHOP.priceNow}
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 flex items-center gap-4 text-[13px] font-sans text-ink-700"
            >
              <div className="flex -space-x-2">
                {[
                  'https://randomuser.me/api/portraits/thumb/women/4.jpg',
                  'https://randomuser.me/api/portraits/thumb/men/65.jpg',
                  'https://randomuser.me/api/portraits/thumb/women/46.jpg',
                  'https://randomuser.me/api/portraits/thumb/men/59.jpg',
                  'https://randomuser.me/api/portraits/thumb/women/18.jpg',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full ring-2 ring-cream-50 object-cover"
                    loading="lazy"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span>
                <strong className="text-ink-900 tabular-nums">10,000+</strong> people have already transformed.
              </span>
            </motion.div>

            {/* Mobile body experience */}
            <div className="lg:hidden mt-12">
              <BodyExperience />
            </div>
          </div>

          {/* RIGHT - Body experience + form */}
          <div className="relative">
            <div className="hidden lg:block">
              <BodyExperience />
            </div>

            <div id="register" className="mt-10 lg:mt-12 scroll-mt-24">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowFlow() {
  return (
    <svg width="64" height="22" viewBox="0 0 64 22" fill="none" aria-hidden>
      <motion.path
        d="M2 11 H 56"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.7, ease: 'easeInOut' }}
      />
      <motion.path
        d="M48 4 L 60 11 L 48 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.6, ease: 'easeOut' }}
      />
    </svg>
  );
}
