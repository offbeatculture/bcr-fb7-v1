import { useEffect, useState } from 'react';

const TIMER_DURATION = 10 * 60 * 1000; // 10 minutes
const STORAGE_KEY = 'bcr_urgency_start';

export function useUrgencyTimer() {
  const getStart = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return parseInt(stored, 10);
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, String(now));
    return now;
  };

  const compute = () => {
    const start = getStart();
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, TIMER_DURATION - elapsed);
    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    return { m, s, done: remaining === 0 };
  };

  const [t, setT] = useState(compute);

  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return t;
}
