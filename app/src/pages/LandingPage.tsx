import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import MenuSection from '@/sections/MenuSection';
import Testimonials from '@/sections/Testimonials';
import Gallery from '@/sections/Gallery';
import Process from '@/sections/Process';
import Footer from '@/sections/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-parchment">
      <Navbar />
      <main>
        <Hero />
        
        <MenuSection />
        <Testimonials />
        <Gallery />
        <Process />
        <About />
      </main>
      <Footer />
    </div>
  );
}
