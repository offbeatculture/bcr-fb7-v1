import { motion } from 'framer-motion';
import { ZONES } from '../data/content.js';

/**
 * Animated body silhouette with the three chakra zones lighting up
 * in rotation. Pure SVG + Framer Motion, no images.
 */
export default function BodyDiagram() {
  return (
    <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto">
      {/* ambient halo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-10 top-6 bottom-6 rounded-[48%] bg-gradient-to-b from-rose-soft/40 via-gold/20 to-teal-mist/40 blur-2xl" />
      </div>

      <svg
        viewBox="0 0 300 400"
        className="w-full h-full"
        role="img"
        aria-label="Body diagram with three chakra zones illuminating in sequence"
      >
        <defs>
          <radialGradient id="zoneGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ZONES[0].color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={ZONES[0].color} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="zoneGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ZONES[1].color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={ZONES[1].color} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="zoneGlow3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ZONES[2].color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={ZONES[2].color} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F1C17" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1F1C17" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* central meridian line */}
        <line
          x1="150" y1="60" x2="150" y2="360"
          stroke="#1F1C17" strokeOpacity="0.08" strokeDasharray="2 6"
        />

        {/* head */}
        <circle cx="150" cy="78" r="26" fill="none" stroke="url(#bodyStroke)" strokeWidth="1.4" />

        {/* torso (rounded trapezoid via path) */}
        <path
          d="M 110 116 Q 150 108 190 116 L 198 230 Q 175 248 150 248 Q 125 248 102 230 Z"
          fill="none" stroke="url(#bodyStroke)" strokeWidth="1.4" strokeLinejoin="round"
        />

        {/* arms */}
        <path d="M 108 122 Q 78 170 86 234" fill="none" stroke="url(#bodyStroke)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 192 122 Q 222 170 214 234" fill="none" stroke="url(#bodyStroke)" strokeWidth="1.4" strokeLinecap="round" />

        {/* hips + legs */}
        <path d="M 110 248 Q 100 290 116 360" fill="none" stroke="url(#bodyStroke)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 190 248 Q 200 290 184 360" fill="none" stroke="url(#bodyStroke)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="150" y1="248" x2="150" y2="360" stroke="url(#bodyStroke)" strokeWidth="1.4" strokeLinecap="round" />

        {/* ZONE 3 - chest/throat (top, teal) */}
        <ZoneGlow cx={150} cy={150} r={62} gradId="zoneGlow3" delay={0} />
        {/* ZONE 2 - gut (rose) */}
        <ZoneGlow cx={150} cy={220} r={56} gradId="zoneGlow2" delay={2.2} />
        {/* ZONE 1 - pelvis/lower body (gold) */}
        <ZoneGlow cx={150} cy={290} r={62} gradId="zoneGlow1" delay={4.4} />

        {/* nucleus dots */}
        {[150, 220, 290].map((cy, i) => (
          <motion.circle
            key={cy}
            cx={150} cy={cy} r={4}
            fill={ZONES[2 - i].color}
            animate={{ scale: [1, 1.6, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 6, delay: i * 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* zone labels */}
      <div className="absolute inset-y-0 right-0 hidden sm:flex flex-col justify-around pr-1 sm:pr-0 sm:-mr-2 lg:-mr-6">
        {ZONES.slice().reverse().map((z, i) => (
          <motion.div
            key={z.id}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5"
          >
            <span className="h-px w-10 bg-ink-900/30" />
            <div>
              <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em]" style={{ color: z.color }}>
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

function ZoneGlow({ cx, cy, r, gradId, delay }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill={`url(#${gradId})`}
      initial={{ opacity: 0.2, scale: 0.85 }}
      animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.85, 1.05, 0.85] }}
      transition={{ duration: 6.6, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'fill-box' }}
    />
  );
}
