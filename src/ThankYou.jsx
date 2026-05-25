import { THANK_YOU_BUTTON_URL } from './data/content.js';

export default function ThankYou() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cream-50 text-ink-900">
      {/* atmosphere - matches landing theme */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-rose-soft/25 blur-3xl" />
        <div className="absolute top-32 -right-32 h-[560px] w-[560px] rounded-full bg-teal-mist/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-[0.35] mix-blend-multiply pointer-events-none" />
      </div>

      <div className="max-shell container-px flex min-h-screen flex-col items-center justify-center text-center py-20">
        {/* check icon */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-teal-mist blur-2xl opacity-70 animate-glowPulse" />
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full ring-2 ring-teal-deep grid place-items-center bg-cream-50">
            <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14 text-teal-deep" aria-hidden>
              <path
                d="M10 25 L20 35 L38 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p className="eyebrow mt-8">Payment confirmed</p>

        <h1 className="display text-[clamp(2.4rem,6vw,4.4rem)] mt-4 text-ink-900">
          Thank You for <span className="italic text-teal-deep">Joining!</span>
        </h1>

        <p className="font-sans text-[17px] sm:text-[18px] text-ink-700 mt-6 max-w-xl leading-relaxed">
          Your spot for the <strong className="text-ink-900">Breath Chakra Reset</strong> is
          confirmed. We can't wait to see you there!
        </p>

        <a
          href={THANK_YOU_BUTTON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-10 !px-8 !py-5 !text-[16px]"
        >
          <span aria-hidden>👉</span>
          Click here to join WhatsApp Group
        </a>

        <p className="font-sans text-[14px] text-ink-500 mt-6 max-w-md">
          Important details and the Zoom link will be shared in the group.
        </p>

        <div className="mt-16 flex items-center gap-2.5 text-ink-700">
          <span className="relative h-7 w-7 rounded-full bg-teal-deep grid place-items-center overflow-hidden">
            <span className="h-3 w-3 rounded-full bg-gold animate-breathe" />
          </span>
          <span className="font-display text-[16px] tracking-tight">
            Breath Chakra <span className="italic text-teal-deep">Reset</span>
          </span>
        </div>
      </div>
    </main>
  );
}
