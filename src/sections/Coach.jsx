import Reveal from '../components/Reveal.jsx';
import coachImg from '../assets/coach-sm.jpg';

export default function Coach() {
  return (
    <section id="coach" className="relative py-24 sm:py-32 bg-cream-100 overflow-hidden">
      <div aria-hidden className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-rose-soft/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full bg-teal-mist/50 blur-3xl" />

      <div className="max-shell container-px relative">
        <div className="grid lg:grid-cols-[0.95fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <Reveal>
            <div className="relative">
              <div className="relative rounded-[28px] overflow-hidden ring-1 ring-ink-900/10 shadow-[0_40px_80px_-40px_rgba(19,17,14,0.45)] aspect-square">
                <img
                  src={coachImg}
                  alt="Dr. Valarrmathi Srinivasan in meditation"
                  width={1080} height={1080}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
                {/* warm tint overlay */}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
              </div>

              {/* floating badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-cream-50 rounded-2xl ring-1 ring-ink-900/10 p-4 sm:p-5 shadow-[0_24px_50px_-25px_rgba(19,17,14,0.4)] animate-floaty">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-deep">Lives transformed</p>
                <p className="font-display text-3xl text-ink-900 mt-1 tabular-nums">10,000+</p>
              </div>

              {/* credential pill */}
              <div className="absolute -top-4 left-6 bg-teal-deep text-cream-50 rounded-full px-4 py-2 shadow-lg">
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] font-semibold">
                  Unicorn Coach
                </p>
              </div>
            </div>
          </Reveal>

          {/* Text side */}
          <div>
            <Reveal>
              <p className="eyebrow">Your coach</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] mt-4 text-ink-900">
                Dr. Valarrmathi <br />
                <span className="italic text-teal-deep">Srinivasan.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-sans text-ink-700 mt-6 text-[16px] sm:text-[17px] leading-relaxed">
                Creator of the Breath Chakra Reset. Certified breath &amp; nervous-system
                regulation coach. For 15+ years, she has helped thousands transform their
                health, reset their energy, and reclaim their best selves - using a blend of
                modern nervous-system science and ancient body-energy mapping.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  'Nervous-System Regulation',
                  'Body-Mind Connection',
                  'Energy Medicine & Kriya Yoga',
                  '10,000+ people transformed',
                ].map((c) => (
                  <li key={c} className="flex items-center gap-3 text-ink-900 font-sans text-[14px]">
                    <span className="h-7 w-7 rounded-full bg-teal-deep/10 text-teal-deep grid place-items-center flex-shrink-0">
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                        <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote className="mt-10 border-l-2 border-gold pl-5 font-display italic text-[20px] sm:text-[22px] text-ink-900 leading-snug">
                “Your body has been sending the same signal for years.
                <span className="text-teal-deep not-italic font-normal"> This is the session that releases it.”</span>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
