export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-900 text-cream-50/75 py-12">
      <div className="max-shell container-px">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative h-7 w-7 rounded-full bg-teal-deep grid place-items-center">
              <span className="h-3 w-3 rounded-full bg-gold animate-breathe" />
            </span>
            <span className="font-display text-[16px] text-cream-50">
              Breath Chakra <span className="italic text-gold">Reset</span>
            </span>
          </div>
          <p className="text-[13px] font-sans">
            © {year} Offbeat Culture Private Limited.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-sans">
            {['Privacy Policy', 'Terms', 'Refund Policy', 'Shipping', 'Contact'].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-cream-50 transition">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
