import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A soft, lagging "breath" of light that follows the cursor.
 * Hidden on touch / coarse pointer devices.
 */
export default function CursorAura() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });
  const enabled = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: fine)');
    enabled.current = mq.matches;
    if (!mq.matches) return;
    const on = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="relative">
        <div className="absolute -inset-40 rounded-full bg-[radial-gradient(circle,rgba(199,153,90,0.35),rgba(199,153,90,0)_60%)]" />
        <div className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(201,75,109,0.18),rgba(201,75,109,0)_70%)]" />
      </div>
    </motion.div>
  );
}
