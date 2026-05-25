import { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * "Racing Thoughts" - visible, anxious thought fragments that drift, jitter,
 * shake and dissolve behind the hero copy. They are intentionally bold so the
 * user FEELS the chaos before the body settles it.
 */
const FRAGMENTS = [
  'did I lock the door?',
  'tomorrow’s meeting…',
  'what if…',
  '5am again',
  'I’m so tired',
  'the email',
  'should I have said that?',
  'again?',
  'remember to call mom',
  'why can’t I just sleep',
  'the deadline',
  'not enough time',
  'is this normal?',
  'I forgot to…',
  'just one more thing',
  'they noticed',
  'why am I like this',
  'too much',
  'don’t think about it',
  'the bills',
  'what did she mean',
  'I can’t',
  'later. later. later.',
  'my back',
  'overthinking again',
  'I should be sleeping',
];

function seededRand(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const COLORS = ['#1F1C17', '#0E5448', '#C94B6D', '#7A1f3d'];

export default function RacingThoughts({
  density = 26,
  className = '',
}) {
  const items = useMemo(() => {
    return Array.from({ length: density }, (_, i) => {
      const text = FRAGMENTS[i % FRAGMENTS.length];
      const left = seededRand(i * 9.1) * 92 + 2;
      const top = seededRand(i * 13.7) * 88 + 4;
      const rot = (seededRand(i * 5.3) - 0.5) * 28;
      const size = 14 + seededRand(i * 3.1) * 16; // 14..30 px (bigger)
      const delay = seededRand(i * 7.7) * 5;
      const dur = 5 + seededRand(i * 11.1) * 4; // 5..9s (faster = racier)
      const drift = (seededRand(i * 17.3) - 0.5) * 60; // px (more travel)
      // Higher visible opacity
      const opacity = 0.25 + seededRand(i * 19.9) * 0.35; // 0.25..0.6
      const color = COLORS[i % COLORS.length];
      // 1 in 4 fragments gets a violent shake burst
      const shaker = i % 4 === 0;
      return { text, left, top, rot, size, delay, dur, drift, opacity, color, shaker, i };
    });
  }, [density]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {items.map((it) => (
        <motion.span
          key={it.i}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{
            opacity: [0, it.opacity, it.opacity, 0],
            y: [12, -it.drift * 0.6, -it.drift, -it.drift - 28],
            x: it.shaker
              ? [0, -4, 5, -3, 4, -2, 3, 0]
              : [0, it.drift * 0.3, -it.drift * 0.2, it.drift * 0.1, 0],
            filter: ['blur(4px)', 'blur(0px)', 'blur(0.5px)', 'blur(8px)'],
            rotate: it.shaker
              ? [it.rot - 3, it.rot + 3, it.rot - 2, it.rot + 2, it.rot]
              : [it.rot - 1, it.rot + 1.5, it.rot - 0.5, it.rot],
          }}
          transition={{
            duration: it.dur,
            delay: it.delay,
            repeat: Infinity,
            ease: it.shaker ? 'linear' : 'easeInOut',
            times: it.shaker
              ? undefined
              : [0, 0.18, 0.78, 1],
          }}
          style={{
            position: 'absolute',
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: `${it.size}px`,
            color: it.color,
            fontFamily: '"Fraunces", serif',
            fontStyle: 'italic',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            textShadow: '0 1px 0 rgba(251,247,240,0.6)',
            willChange: 'transform, opacity, filter',
          }}
        >
          {it.text}
        </motion.span>
      ))}
    </div>
  );
}
