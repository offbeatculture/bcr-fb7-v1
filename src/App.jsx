import Nav from './components/Nav.jsx';
import CursorAura from './components/CursorAura.jsx';
import Hero from './sections/Hero.jsx';
import PainPoints from './sections/PainPoints.jsx';
import StatsBand from './sections/StatsBand.jsx';
import BeforeAfter from './sections/BeforeAfter.jsx';
import Inside from './sections/Inside.jsx';
import Coach from './sections/Coach.jsx';
import Testimonials from './sections/Testimonials.jsx';
import FinalCTA from './sections/FinalCTA.jsx';
import Footer from './sections/Footer.jsx';
import { WorkshopProvider } from './components/WorkshopContext.jsx';

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
        <PainPoints />
        <StatsBand />
        <BeforeAfter />
        <Inside />
        <Coach />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </WorkshopProvider>
  );
}
