import { useState } from 'react';
import {
  WORKSHOP,
  PROFESSIONS,
  REASONS,
  LEADS_SHEET_WEBAPP_URL,
} from '../data/content.js';
import { useWorkshop } from './WorkshopContext.jsx';
import { useRoute } from './RouteContext.jsx';

function buildRazorpayUrl(data, routeConfig) {
  const params = new URLSearchParams();
  const fullName = (data.name || '').trim();
  const rawPhone = stripCountryCode(data.phone || '');

  // Only send what Razorpay's UDF fields need — keep URL short
  params.set('name', fullName);
  params.set('email', data.email || '');
  params.set('whatsapp_number', rawPhone);
  params.set('profession', data.profession || '');
  params.set('source', routeConfig.source);
  // razorpayUrl may already carry a query (e.g. ?lpsource=fb7) — join accordingly
  const sep = routeConfig.razorpayUrl.includes('?') ? '&' : '?';
  return `${routeConfig.razorpayUrl}${sep}${params.toString()}`;
}

// Strip +91 / 91 prefix so downstream systems (Zacx, sheets) get bare 10-digit numbers
function stripCountryCode(phone) {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length > 10 && digits.startsWith('91')) return digits.slice(2);
  return digits;
}

export default function RegistrationForm({ compact = false }) {
  const { date, day, time } = useWorkshop();
  const routeConfig = useRoute();
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.name || data.name.trim().length < 2) e.name = 'Please share your full name.';
    if (!/^\S+@\S+\.\S+$/.test(data.email || '')) e.email = 'Please enter a valid email.';
    if (!/^[\d +()-]{7,}$/.test(data.phone || '')) e.phone = 'Please enter a valid WhatsApp number.';
    if (!data.profession) e.profession = 'Please select one.';
    if (!data.reason) e.reason = 'Please select one.';
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const firstKey = Object.keys(e)[0];
      const el = ev.currentTarget.elements.namedItem(firstKey);
      if (el && typeof el.focus === 'function') el.focus();
      return;
    }
    setStatus('submitting');

    const urlParams = new URLSearchParams(window.location.search);
    const cleanPhone = stripCountryCode(data.phone || '');
    const payload = {
      name: data.name,
      email: data.email,
      phone: cleanPhone,
      whatsapp_number: cleanPhone,
      profession: data.profession,
      reason: data.reason,
      source: routeConfig.source,
      utm_source: urlParams.get('utm_source') || routeConfig.source,
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      fbclid: urlParams.get('fbclid') || '',
      gclid: urlParams.get('gclid') || '',
      page_url: window.location.href,
      submitted_at: new Date().toISOString(),
    };

    // Fire-and-forget to Google Sheets Apps Script (fallback)
    const sheetUrl = LEADS_SHEET_WEBAPP_URL;
    if (sheetUrl && !sheetUrl.startsWith('PASTE')) {
      try {
        fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors',
          keepalive: true,
        });
      } catch { /* fire-and-forget */ }
    }

    // n8n webhook (primary lead capture — BCR-FP7 / BCR-GA7)
    if (routeConfig.webhookUrl) {
      try {
        fetch(routeConfig.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors',
          keepalive: true,
        });
      } catch { /* fire-and-forget */ }
    }

    window.location.href = buildRazorpayUrl(data, routeConfig);
  };

  return (
    <div
      className={`relative rounded-3xl bg-cream-50 ring-1 ring-ink-900/10 shadow-[0_30px_80px_-40px_rgba(19,17,14,0.4)] ${
        compact ? 'p-6 sm:p-7' : 'p-7 sm:p-9'
      }`}
    >
      <div className="absolute -top-3 left-6 right-6 flex justify-between items-center">
        <span className="bg-rose-saree text-cream-50 text-[11px] font-sans font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
          Only {WORKSHOP.seatsLeft} seats left
        </span>
        <span className="bg-ink-900 text-cream-50 text-[11px] font-sans font-medium tracking-tight px-3 py-1.5 rounded-full">
          {WORKSHOP.currency}{WORKSHOP.priceNow}{' '}
          <span className="line-through opacity-50 ml-1">{WORKSHOP.currency}{WORKSHOP.priceWas}</span>
        </span>
      </div>

      <div className="mb-5 mt-2">
        <p className="eyebrow">Reserve your seat</p>
        <h3 className="font-display text-[26px] sm:text-3xl leading-tight mt-2">
          {date} <span className="italic text-teal-deep">·</span> {day}
        </h3>
        <p className="font-display text-[20px] sm:text-[22px] font-medium text-ink-900 mt-1.5">{time}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field
          label="Full name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Ananya Iyer"
          error={errors.name}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            spellCheck={false}
            error={errors.email}
          />
          <PhoneField
            label="WhatsApp number"
            name="phone"
            error={errors.phone}
          />
        </div>

        <Select
          label="Profession"
          name="profession"
          placeholder="Select Profession"
          options={PROFESSIONS}
          error={errors.profession}
        />

        <Select
          label="What led you to register for this workshop?"
          name="reason"
          placeholder="Select a reason"
          options={REASONS}
          error={errors.reason}
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full !text-[15px] !py-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Taking you to payment…' : (
            <>
              Secure My Spot - Pay {WORKSHOP.currency}{WORKSHOP.priceNow} Now
              <span aria-hidden>→</span>
            </>
          )}
        </button>

        <p className="text-center font-sans text-[12px] text-ink-700 leading-relaxed">
          You'll be taken to a secure Razorpay page. <br className="sm:hidden" />
          We respect your inbox - no spam, ever.
        </p>
      </form>
    </div>
  );
}

function Field({ label, name, type = 'text', error, ...rest }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[12px] font-sans font-semibold uppercase tracking-[0.16em] text-ink-700 mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`w-full bg-cream-100 rounded-xl px-4 py-3.5 text-[15px] font-sans text-ink-900 ring-1 transition focus:outline-none focus-visible:ring-2 ${
          error ? 'ring-rose-saree/60 focus-visible:ring-rose-saree' : 'ring-ink-900/10 focus-visible:ring-teal-deep'
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="text-rose-saree text-[12px] mt-1.5 font-sans" role="alert">{error}</p>
      )}
    </div>
  );
}

function PhoneField({ label, name, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[12px] font-sans font-semibold uppercase tracking-[0.16em] text-ink-700 mb-1.5">
        {label}
      </label>
      <div className={`flex items-center bg-cream-100 rounded-xl ring-1 transition focus-within:ring-2 ${
        error ? 'ring-rose-saree/60 focus-within:ring-rose-saree' : 'ring-ink-900/10 focus-within:ring-teal-deep'
      }`}>
        <span className="pl-4 pr-1.5 text-[15px] font-sans text-ink-500 select-none whitespace-nowrap">+91</span>
        <input
          id={name}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="90000 00000"
          spellCheck={false}
          className="flex-1 bg-transparent rounded-r-xl px-2 py-3.5 text-[15px] font-sans text-ink-900 focus:outline-none"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="text-rose-saree text-[12px] mt-1.5 font-sans" role="alert">{error}</p>
      )}
    </div>
  );
}

function Select({ label, name, placeholder, options, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[12px] font-sans font-semibold uppercase tracking-[0.16em] text-ink-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue=""
          className={`appearance-none w-full bg-cream-100 rounded-xl px-4 py-3.5 text-[15px] font-sans text-ink-900 ring-1 focus:outline-none focus-visible:ring-2 transition ${
            error ? 'ring-rose-saree/60 focus-visible:ring-rose-saree' : 'ring-ink-900/10 focus-visible:ring-teal-deep'
          }`}
          aria-invalid={Boolean(error)}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-700"
          viewBox="0 0 20 20" fill="none"
        >
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && (
        <p className="text-rose-saree text-[12px] mt-1.5 font-sans" role="alert">{error}</p>
      )}
    </div>
  );
}
