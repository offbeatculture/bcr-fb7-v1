import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MeditationBody from './MeditationBody.jsx';
import { WORKSHOP } from '../data/content.js';

/**
 * BodyExperience - the interactive centrepiece.
 *
 * Stressed (default):
 *  - Readable thought fragments float around the body (no rotation, so the
 *    user can actually READ them).
 *  - Red ALERT tags pulse from the chakras.
 *  - The body has a subtle tremor.
 *
 * Calm (after pressing "Apply the Breath Chakra Reset"):
 *  - Thoughts dissolve outward.
 *  - The body settles into a peaceful teal+gold breathing state.
 *  - A CTA appears converting the felt experience into the sale.
 */

// Positioned in 8 anchor points around the body. Each has a side + vertical
// position so we can keep them OFF the silhouette and fully readable.
const FLOATING_THOUGHTS = [
  { text: "My mind won't switch off", anchor: 'tl', delay: 0.0 },
  { text: 'Why am I still tired?',     anchor: 'tr', delay: 0.4 },
  { text: 'Bloated again',             anchor: 'r1', delay: 0.8 },
  { text: 'Acidity, every day',        anchor: 'r2', delay: 1.2 },
  { text: 'Shoulders so tight',        anchor: 'l1', delay: 1.6 },
  { text: "I can't sleep",             anchor: 'l2', delay: 2.0 },
  { text: "Tomorrow's meeting…",       anchor: 'bl', delay: 2.4 },
  { text: 'What if I…',                anchor: 'br', delay: 2.8 },
];

const CALM_THOUGHTS = [
  { text: 'My mind feels still',        anchor: 'tl', delay: 0.0 },
  { text: 'I feel rested',              anchor: 'tr', delay: 0.3 },
  { text: 'Stomach feels light',        anchor: 'r1', delay: 0.6 },
  { text: 'Digestion at ease',          anchor: 'r2', delay: 0.9 },
  { text: 'Shoulders relaxed',          anchor: 'l1', delay: 1.2 },
  { text: 'I slept deeply',             anchor: 'l2', delay: 1.5 },
  { text: 'I feel ready',               anchor: 'bl', delay: 1.8 },
  { text: 'I am at peace',              anchor: 'br', delay: 2.1 },
];

// Map anchor → absolute positioning around the body. Values are %.
const ANCHORS = {
  tl: { top: '4%',  left: '2%',   align: 'left'  },
  tr: { top: '4%',  right: '2%',  align: 'right' },
  l1: { top: '30%', left: '-2%',  align: 'left'  },
  r1: { top: '30%', right: '-2%', align: 'right' },
  l2: { top: '55%', left: '-2%',  align: 'left'  },
  r2: { top: '55%', right: '-2%', align: 'right' },
  bl: { bottom: '6%', left: '4%',  align: 'left'  },
  br: { bottom: '6%', right: '4%', align: 'right' },
};

const ALERTS = [
  { label: 'TENSION DETECTED', side: 'left',  y: 28 },
  { label: 'GUT UNSETTLED',    side: 'right', y: 50 },
  { label: 'MIND RACING',      side: 'left',  y: 72 },
];

export default function BodyExperience() {
  const [state, setState] = useState('stressed'); // 'stressed' | 'resetting' | 'calm'
  const isCalm = state === 'calm';
  const isResetting = state === 'resetting';

  const handleReset = () => {
    if (state !== 'stressed') return;
    setState('resetting');
    setTimeout(() => setState('calm'), 2400);
  };
  const handleAgain = () => setState('stressed');

  return (
    <div className="relative w-full">
      {/* Status pill above the body */}
      <div className="flex justify-center mb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-sans font-semibold uppercase tracking-[0.16em] ring-1 ${
              isCalm
                ? 'bg-teal-deep/10 text-teal-deep ring-teal-deep/30'
                : isResetting
                ? 'bg-gold/15 text-ink-900 ring-gold/40'
                : 'bg-rose-saree/10 text-rose-saree ring-rose-saree/30'
            }`}
          >
            <motion.span
              className={`h-1.5 w-1.5 rounded-full ${
                isCalm ? 'bg-teal-deep' : isResetting ? 'bg-gold' : 'bg-rose-saree'
              }`}
              animate={isCalm ? { opacity: [0.6, 1, 0.6] } : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: isCalm ? 3 : 0.9, repeat: Infinity }}
            />
            {isCalm ? 'Nervous system: regulated' : isResetting ? 'Resetting…' : 'Nervous system: activated'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The interactive arena - kept compact so it works on desktop too */}
      <div className="relative w-full max-w-[460px] mx-auto aspect-[4/5]">

        {/* === FLOATING THOUGHTS (readable, no rotation) === */}
        <AnimatePresence>
          {!isCalm && (
            <motion.div
              key="thoughts"
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {FLOATING_THOUGHTS.map((t, i) => {
                const a = ANCHORS[t.anchor];
                return (
                  <motion.div
                    key={t.text}
                    className="absolute"
                    style={{
                      top: a.top,
                      bottom: a.bottom,
                      left: a.left,
                      right: a.right,
                      maxWidth: '46%',
                      textAlign: a.align,
                    }}
                    initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                    animate={
                      isResetting
                        ? {
                            opacity: 0,
                            y: -10,
                            x: a.align === 'left' ? -40 : 40,
                            filter: 'blur(8px)',
                          }
                        : {
                            opacity: [0, 0.95, 0.95, 0.6],
                            y: [6, 0, -2, -6],
                            filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(2px)'],
                          }
                    }
                    transition={
                      isResetting
                        ? { duration: 1.2, ease: 'easeOut' }
                        : {
                            duration: 6,
                            delay: t.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            times: [0, 0.18, 0.7, 1],
                          }
                    }
                  >
                    <motion.div
                      className="inline-block font-serif italic font-medium text-ink-900 bg-cream-50/95 backdrop-blur ring-1 ring-rose-saree/25 rounded-2xl px-3 py-1.5 shadow-[0_8px_24px_-12px_rgba(201,75,109,0.4)]"
                      style={{ fontSize: 'clamp(11px, 1.2vw, 13px)' }}
                      animate={{
                        x: [0, -1.2, 1.5, -0.8, 1, 0],
                        rotate: [0, -0.5, 0.6, -0.3, 0.4, 0],
                      }}
                      transition={{
                        duration: 2.5 + (i % 3) * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.15,
                      }}
                    >
                      “{t.text}”
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* === CALM POSITIVE THOUGHTS (after reset) === */}
        <AnimatePresence>
          {isCalm && (
            <motion.div
              key="calm-thoughts"
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {CALM_THOUGHTS.map((t, i) => {
                const a = ANCHORS[t.anchor];
                return (
                  <motion.div
                    key={t.text}
                    className="absolute"
                    style={{
                      top: a.top,
                      bottom: a.bottom,
                      left: a.left,
                      right: a.right,
                      maxWidth: '46%',
                      textAlign: a.align,
                    }}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{
                      opacity: [0, 0.9, 0.9, 0.7],
                      y: [10, 0, -1, -3],
                    }}
                    transition={{
                      duration: 8,
                      delay: t.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.15, 0.7, 1],
                    }}
                  >
                    <motion.div
                      className="inline-block font-serif italic font-medium text-teal-deep bg-teal-mist/80 backdrop-blur ring-1 ring-teal-deep/20 rounded-2xl px-3 py-1.5 shadow-[0_8px_24px_-12px_rgba(14,84,72,0.3)]"
                      style={{ fontSize: 'clamp(11px, 1.2vw, 13px)' }}
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 4 + (i % 3) * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    >
                      "{t.text}"
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* === ALERT TAGS pointing at body zones === */}
        <AnimatePresence>
          {!isCalm && !isResetting && (
            <>
              {ALERTS.map((a, i) => (
                <motion.div
                  key={a.label}
                  className={`absolute z-20 hidden md:flex items-center gap-2 ${
                    a.side === 'left' ? 'left-[-12%]' : 'right-[-12%]'
                  }`}
                  style={{ top: `${a.y}%` }}
                  initial={{ opacity: 0, x: a.side === 'left' ? -14 : 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                >
                  {a.side === 'right' && (
                    <motion.span
                      className="h-px bg-rose-saree/70"
                      animate={{ width: [16, 32, 16] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <motion.div
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-saree text-cream-50 text-[9px] font-sans font-bold uppercase tracking-[0.15em] shadow-md whitespace-nowrap"
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(201,75,109,0.55)',
                        '0 0 0 10px rgba(201,75,109,0)',
                        '0 0 0 0 rgba(201,75,109,0)',
                      ],
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: i * 0.3 }}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-cream-50" />
                    {a.label}
                  </motion.div>
                  {a.side === 'left' && (
                    <motion.span
                      className="h-px bg-rose-saree/70"
                      animate={{ width: [16, 32, 16] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* === Reset shockwave during transition === */}
        <AnimatePresence>
          {isResetting && (
            <>
              {/* Primary shockwave */}
              <motion.div
                key="shock"
                className="absolute inset-0 rounded-full pointer-events-none z-0"
                initial={{ scale: 0, opacity: 0.85 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(199,153,90,0.55), rgba(14,84,72,0.35) 40%, transparent 70%)',
                }}
              />
              {/* Secondary ring pulse */}
              <motion.div
                key="ring"
                className="absolute inset-[15%] rounded-full pointer-events-none z-0 border-2 border-gold/50"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.8, opacity: [0, 0.7, 0] }}
                transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
              />
              {/* Particle burst */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI;
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full pointer-events-none z-0"
                    style={{ background: i % 2 === 0 ? '#C7995A' : '#0E5448' }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: Math.cos(angle) * 120,
                      y: Math.sin(angle) * 120,
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                    }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* === THE BODY - gentle tremor when stressed === */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={
            isCalm
              ? { x: 0, y: 0 }
              : isResetting
              ? { x: 0, y: 0, scale: [1, 1.04, 1] }
              : { x: [0, -1, 1.2, -0.8, 0.6, 0], y: [0, 0.6, -0.4, 0.8, -0.6, 0] }
          }
          transition={
            isResetting
              ? { duration: 1.4, ease: 'easeInOut' }
              : isCalm
              ? { duration: 0.8 }
              : { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <div className="w-[78%] h-[95%]">
            <MeditationBody state={state} />
          </div>
        </motion.div>

        {/* === INLINE CLICK TRIGGER (inside the animation area) === */}
        <AnimatePresence mode="wait">
          {!isCalm && !isResetting && (
            <motion.button
              key="inline-reset"
              type="button"
              onClick={handleReset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-deep/90 backdrop-blur-sm text-cream-50 font-sans font-semibold text-[13px] sm:text-[14px] shadow-lg shadow-teal-deep/40 ring-1 ring-gold/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-gold/50"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  aria-hidden
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="text-gold text-base"
                >
                  ✦
                </motion.span>
                Click Here to Feel the Reset
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.div>
            </motion.button>
          )}
          {isResetting && (
            <motion.div
              key="resetting-label"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="px-4 py-2.5 rounded-full bg-gold/20 backdrop-blur-sm text-ink-900 font-sans font-semibold text-[13px] ring-1 ring-gold/40">
                Releasing…
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* === CTA after calm state === */}
      <AnimatePresence>
        {isCalm && (
          <motion.div
            key="calm-cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 flex flex-col items-center gap-3 text-center"
          >
            <motion.p
              className="font-serif italic text-[18px] sm:text-[20px] text-teal-deep"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Feel that? That's a 5-second preview.
            </motion.p>
            <motion.p
              className="font-sans text-[14px] text-ink-700 max-w-[360px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              In the full session, this becomes a state your body can access - anytime, anywhere.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 mt-1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <a href="#register" className="btn-primary group">
                Yes! I Want This - Only ₹{WORKSHOP.priceNow}
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </a>
              <button
                type="button"
                onClick={handleAgain}
                className="text-[13px] font-sans text-ink-700 underline-offset-4 hover:underline"
              >
                Feel it again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
