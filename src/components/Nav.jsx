import { useEffect, useState } from 'react';
import { useWorkshop } from './WorkshopContext.jsx';
import { useUrgencyTimer } from '../hooks/useUrgencyTimer.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { date } = useWorkshop();
  const { m, s, done } = useUrgencyTimer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-500 bg-cream-50/85 backdrop-blur-md border-b border-ink-900/8`}
    >
      <div className="max-shell container-px h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative h-8 w-8 rounded-full bg-teal-deep grid place-items-center overflow-hidden">
            <span className="h-3.5 w-3.5 rounded-full bg-gold animate-breathe" />
          </span>
          <span className="font-display text-[19px] tracking-tight">
            Breath Chakra
          </span>
          <span className="hidden sm:inline text-[12px] font-sans text-ink-700 ml-1">
            · {date}
          </span>
        </a>

        {/* Urgency timer */}
        <div className="hidden md:flex items-center gap-2 text-[13px] font-sans">
          {done ? (
            <span className="text-rose-saree font-semibold animate-pulse">⚡ Price increasing - act now!</span>
          ) : (
            <>
              <span className="text-rose-saree font-semibold">₹99 ends in</span>
              <span className="font-mono text-[13px] tabular-nums bg-ink-900 text-cream-50 px-2 py-0.5 rounded-md">
                {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
              </span>
            </>
          )}
        </div>

        <a href="#register" className="btn-primary !py-2.5 !px-5 text-[14px]">
          Claim My Spot - ₹99
          <span aria-hidden>→</span>
        </a>
      </div>
    </nav>
  );
}
