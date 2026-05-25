import { lazy, Suspense } from 'react';
import Nav from './components/Nav.jsx';
import CursorAura from './components/CursorAura.jsx';
import Hero from './sections/Hero.jsx';
import { WorkshopProvider } from './components/WorkshopContext.jsx';

const PainPoints = lazy(() => import('./sections/PainPoints.jsx'));
const StatsBand = lazy(() => import('./sections/StatsBand.jsx'));
const BeforeAfter = lazy(() => import('./sections/BeforeAfter.jsx'));
const Inside = lazy(() => import('./sections/Inside.jsx'));
const Coach = lazy(() => import('./sections/Coach.jsx'));
const Testimonials = lazy(() => import('./sections/Testimonials.jsx'));
const FinalCTA = lazy(() => import('./sections/FinalCTA.jsx'));
const Footer = lazy(() => import('./sections/Footer.jsx'));

function LazySection({ children }) {
  return <Suspense fallback={<div className="py-20" />}>{children}</Suspense>;
}

export default function App() {
  return (
    <WorkshopProvider>
      <a
        href="#register"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-teal-deep focus:text-cream-50 focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to registration
      </a>
      <CursorAura />
      <Nav />
      <main>
        <Hero />
        <LazySection><PainPoints /></LazySection>
        <LazySection><StatsBand /></LazySection>
        <LazySection><BeforeAfter /></LazySection>
        <LazySection><Inside /></LazySection>
        <LazySection><Coach /></LazySection>
        <LazySection><Testimonials /></LazySection>
        <LazySection><FinalCTA /></LazySection>
      </main>
      <LazySection><Footer /></LazySection>
    </WorkshopProvider>
  );
}
