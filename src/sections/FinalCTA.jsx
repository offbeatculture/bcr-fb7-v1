import Reveal from '../components/Reveal.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';
import { useUrgencyTimer } from '../hooks/useUrgencyTimer.js';

export default function FinalCTA() {
  const { m, s, done } = useUrgencyTimer();

  return (
    <section className="relative py-24 sm:py-32 bg-teal-deep text-cream-50 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-[0.2] mix-blend-overlay pointer-events-none" />
      <div aria-hidden className="absolute -top-32 left-1/4 h-[440px] w-[440px] rounded-full bg-rose-saree/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 right-0 h-[460px] w-[460px] rounded-full bg-gold/30 blur-3xl" />

      <div className="max-shell container-px relative grid lg:grid-cols-[1.1fr_0.95fr] gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <p className="eyebrow !text-gold">One signal. One session.</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2.2rem,5vw,4rem)] mt-5 leading-[1]">
              Your body has been sending <br />
              the same signal for years. <br />
              <span className="italic text-cream-50/85">This is the session that releases it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-sans text-cream-50/80 mt-7 text-[16px] sm:text-[17px] max-w-xl leading-relaxed">
              Join thousands of people who came in carrying tight muscles, broken sleep,
              an unsettled gut, and a mind that wouldn't stop - and left feeling something
              they hadn't felt in years.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 max-w-md">
              {done ? (
                <div className="rounded-2xl bg-rose-saree/20 backdrop-blur ring-1 ring-cream-50/20 px-5 py-4 text-center">
                  <p className="font-display text-2xl text-cream-50">⚡ Special pricing ending - act now!</p>
                </div>
              ) : (
                <div className="rounded-2xl bg-cream-50/10 backdrop-blur ring-1 ring-cream-50/15 px-5 py-4 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-50/65 mb-2">₹99 price expires in</p>
                  <p className="font-display text-4xl tabular-nums">
                    {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-10 space-y-2.5 font-sans text-[14px] text-cream-50/85">
              {[
                'A 3-hour body-led masterclass',
                'Body Signal Diagnosis · 3-Zone Unlock · Safety Switch',
                'Lifetime access to the Safety Switch practice',
                '30-day no-questions money-back guarantee',
              ].map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" aria-hidden>
                    <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div>
          <RegistrationForm compact />
        </div>
      </div>
    </section>
  );
}
