import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ZONES } from '../data/content.js';

/**
 * MeditationBody - a silhouette in lotus pose. Three chakras glow in
 * sequence with rotating energy rays, a light beam travels up the spine,
 * sparkles orbit the crown, and a periodic "release burst" makes the
 * activation impossible to miss.
 */
export default function MeditationBody({ state = 'stressed' }) {
  const isCalm = state === 'calm';
  const isResetting = state === 'resetting';

  // Color palette swaps based on state
  // Stressed = harsh rose/red alert. Calm = peaceful teal/gold.
  const palette = isCalm
    ? ['#0E5448', '#C7995A', '#0E5448'] // heart, gut, root - calm
    : ['#C94B6D', '#D9534F', '#B8385A']; // alert reds/roses

  const auraGradient = isCalm
    ? 'radial-gradient(circle at 50% 55%,rgba(14,84,72,0.45),rgba(199,153,90,0.32) 40%,rgba(232,181,194,0.18) 65%,transparent 82%)'
    : 'radial-gradient(circle at 50% 55%,rgba(201,75,109,0.55),rgba(217,83,79,0.32) 40%,rgba(184,56,90,0.22) 65%,transparent 82%)';

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        x: 190 + ((i * 37) % 21) - 10,
        delay: (i * 0.45) % 5,
        dur: 4.5 + ((i * 13) % 7) * 0.4,
        drift: ((i * 9) % 9) - 4,
        size: 1.8 + ((i * 5) % 5) * 0.5,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const r = 70 + (i % 3) * 10;
        return {
          id: i,
          cx: 200 + Math.cos(angle) * r,
          cy: 118 + Math.sin(angle) * r * 0.7,
          delay: (i * 0.35) % 4,
        };
      }),
    []
  );

  // Three chakra centres - colours driven by state
  const chakras = [
    { cy: 205, color: palette[0], label: ZONES[2].label, delay: 0 },
    { cy: 265, color: palette[1], label: ZONES[1].label, delay: isCalm ? 2.0 : 0.6 },
    { cy: 330, color: palette[2], label: ZONES[0].label, delay: isCalm ? 4.0 : 1.2 },
  ];

  // Stressed pulses are FAST and harsh. Calm pulses are slow and smooth.
  const pulseDur = isCalm ? 6 : 1.8;

  return (
    <div className="relative w-full max-w-[480px] mx-auto aspect-[4/5]">
      {/* Massive breathing aura - colour driven by state */}
      <motion.div
        aria-hidden
        className="absolute -inset-4 rounded-[50%]"
        style={{ background: auraGradient, transformOrigin: 'center', filter: 'blur(2px)' }}
        animate={{
          scale: isCalm ? [1, 1.08, 1] : [1, 1.04, 1],
          opacity: isCalm ? [0.85, 1, 0.85] : [0.9, 1, 0.9],
        }}
        transition={{ duration: pulseDur, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer mandala ring - slowly rotating */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-2 rounded-full border border-gold/30 border-dashed" />
        <div className="absolute inset-8 rounded-full border border-teal-deep/15" />
      </motion.div>

      {/* Periodic "release burst" - gentle in calm, sharp/red in stressed */}
      <motion.div
        aria-hidden
        className={`absolute inset-0 rounded-full border-2 ${isCalm ? 'border-gold/60' : 'border-rose-saree/70'}`}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.25, 1.4], opacity: [0, isCalm ? 0.7 : 0.85, 0] }}
        transition={{ duration: isCalm ? 6.5 : 2.2, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformOrigin: 'center' }}
      />
      <motion.div
        aria-hidden
        className={`absolute inset-0 rounded-full border ${isCalm ? 'border-rose-saree/50' : 'border-rose-saree/40'}`}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: [0.7, 1.35, 1.5], opacity: [0, 0.55, 0] }}
        transition={{ duration: isCalm ? 6.5 : 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
        style={{ transformOrigin: 'center' }}
      />

      <svg
        viewBox="0 0 400 500"
        className="relative w-full h-full"
        role="img"
        aria-label="A silhouette in meditation. Three chakra zones glow at the chest, gut and root, with rotating energy rays and a light beam rising up the spine."
      >
        <defs>
          <linearGradient id="figureFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F1C17" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1F1C17" stopOpacity="0.82" />
          </linearGradient>

          {chakras.map((c, i) => (
            <radialGradient key={i} id={`glow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={c.color} stopOpacity="1" />
              <stop offset="40%" stopColor={c.color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0" />
            </radialGradient>
          ))}

          <linearGradient id="spineBeam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#C7995A" stopOpacity="0" />
            <stop offset="50%" stopColor="#C7995A" stopOpacity="1" />
            <stop offset="100%" stopColor="#C7995A" stopOpacity="0" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="bigGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* HUGE chakra glow halos - drawn behind the figure */}
        {chakras.map((c, i) => (
          <motion.circle
            key={`halo-${i}`}
            cx="200" cy={c.cy} r={isCalm ? 120 : 90}
            fill={`url(#glow-${i})`}
            filter="url(#bigGlow)"
            initial={{ opacity: 0.2, scale: 0.7 }}
            animate={{
              opacity: isCalm ? [0.25, 1, 0.25] : [0.5, 1, 0.5],
              scale: isCalm ? [0.7, 1.25, 0.7] : [0.85, 1.1, 0.85],
            }}
            transition={{ duration: pulseDur, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
            style={{ transformOrigin: `200px ${c.cy}px`, transformBox: 'fill-box' }}
          />
        ))}

        {/* Rotating energy rays from each chakra */}
        {chakras.map((c, i) => (
          <motion.g
            key={`rays-${i}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 22 + i * 6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `200px ${c.cy}px`, transformBox: 'fill-box' }}
          >
            {Array.from({ length: 12 }).map((_, k) => {
              const a = (k / 12) * Math.PI * 2;
              const r1 = 28;
              const r2 = 72;
              return (
                <line
                  key={k}
                  x1={200 + Math.cos(a) * r1}
                  y1={c.cy + Math.sin(a) * r1}
                  x2={200 + Math.cos(a) * r2}
                  y2={c.cy + Math.sin(a) * r2}
                  stroke={c.color}
                  strokeOpacity={k % 2 ? 0.55 : 0.85}
                  strokeWidth={k % 2 ? 1 : 1.6}
                  strokeLinecap="round"
                />
              );
            })}
          </motion.g>
        ))}

        {/* Light beam travelling up the spine */}
        <motion.rect
          x="196" y="100" width="8" height="290" rx="4"
          fill="url(#spineBeam)"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#softGlow)"
        />
        <motion.circle
          cx="200" r="6"
          fill="#FFE6B0"
          filter="url(#softGlow)"
          initial={{ cy: 390, opacity: 0 }}
          animate={{ cy: [390, 100], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* === FIGURE === */}
        {/* Lotus base */}
        <path
          d="M 95 410 Q 80 430 110 446 Q 150 460 200 460 Q 250 460 290 446 Q 320 430 305 410 Q 280 392 240 390 L 160 390 Q 120 392 95 410 Z"
          fill="url(#figureFill)"
        />
        <path d="M 140 412 Q 200 440 260 412" stroke="#C7995A" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
        <path d="M 150 422 Q 200 448 250 422" stroke="#C7995A" strokeOpacity="0.3" strokeWidth="1.1" fill="none" />

        {/* Torso */}
        <path
          d="M 180 168 L 220 168 Q 244 172 256 198 Q 268 230 270 270 Q 274 318 250 360 Q 230 388 200 392 Q 170 388 150 360 Q 126 318 130 270 Q 132 230 144 198 Q 156 172 180 168 Z"
          fill="url(#figureFill)"
        />
        {/* Hands */}
        <path d="M 168 350 Q 200 372 232 350 Q 232 380 200 380 Q 168 380 168 350 Z" fill="#1F1C17" fillOpacity="0.9" />
        {/* Neck */}
        <path d="M 188 150 L 212 150 L 214 172 L 186 172 Z" fill="url(#figureFill)" />
        {/* Head */}
        <ellipse cx="200" cy="118" rx="38" ry="42" fill="url(#figureFill)" />

        {/* Crown glow above head */}
        <motion.circle
          cx="200" cy="78" r="28"
          fill="#C7995A" fillOpacity="0.55"
          filter="url(#bigGlow)"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '200px 78px', transformBox: 'fill-box' }}
        />

        {/* Bindi */}
        <motion.circle
          cx="200" cy="108" r="2.6"
          fill="#C94B6D"
          animate={{ opacity: [0.6, 1, 0.6], r: [2.6, 3.4, 2.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Chakra nuclei on the silhouette - bright bullseyes */}
        {chakras.map((c, i) => (
          <g key={`nucleus-${i}`}>
            <motion.circle
              cx="200" cy={c.cy} r="10"
              fill={c.color}
              filter="url(#softGlow)"
              animate={{
                scale: isCalm ? [1, 1.8, 1] : [1, 1.4, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: pulseDur, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
              style={{ transformOrigin: `200px ${c.cy}px`, transformBox: 'fill-box' }}
            />
            <circle cx="200" cy={c.cy} r="3.5" fill="#FBF7F0" />
            {/* Outward shockwave */}
            <motion.circle
              cx="200" cy={c.cy} r="14"
              fill="none" stroke={c.color} strokeWidth="2" strokeOpacity="0.9"
              animate={{ scale: [1, 3.2, 1], opacity: [0.85, 0, 0.85] }}
              transition={{ duration: pulseDur, repeat: Infinity, delay: c.delay, ease: 'easeOut' }}
              style={{ transformOrigin: `200px ${c.cy}px`, transformBox: 'fill-box' }}
            />
            <motion.circle
              cx="200" cy={c.cy} r="14"
              fill="none" stroke={c.color} strokeWidth="1.4" strokeOpacity="0.7"
              animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: pulseDur, repeat: Infinity, delay: c.delay + 0.4, ease: 'easeOut' }}
              style={{ transformOrigin: `200px ${c.cy}px`, transformBox: 'fill-box' }}
            />
          </g>
        ))}

        {/* Sparkles orbiting the head */}
        {sparkles.map((s) => (
          <motion.g key={s.id}>
            <motion.circle
              cx={s.cx} cy={s.cy} r="1.8"
              fill="#C7995A"
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 0.4] }}
              transition={{ duration: 2.6, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${s.cx}px ${s.cy}px`, transformBox: 'fill-box' }}
            />
          </motion.g>
        ))}

        {/* Breath particles rising from crown */}
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.x} cy={60} r={p.size}
            fill="#C7995A"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.9, 0.6, 0],
              y: [0, -40, -75, -115],
              x: [0, p.drift, p.drift * 1.5, p.drift * 1.9],
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* Zone labels (desktop) */}
      <div className="absolute inset-y-0 right-0 hidden lg:flex flex-col justify-between py-12 pr-1 -mr-2 xl:-mr-6">
        {[ZONES[2], ZONES[1], ZONES[0]].map((z, i) => (
          <motion.div
            key={z.id}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              className="h-px bg-ink-900/30"
              animate={{ width: [32, 48, 32] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
            />
            <div>
              <p
                className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em]"
                style={{ color: z.color }}
              >
                {z.label}
              </p>
              <p className="text-[12px] text-ink-700 font-sans">{z.region}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
