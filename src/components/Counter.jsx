import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

export default function Counter({ to, suffix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const display =
    to >= 1000
      ? Math.round(val).toLocaleString('en-IN')
      : Number.isInteger(to)
      ? Math.round(val).toString()
      : val.toFixed(1);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
      {suffix}
    </span>
  );
}
