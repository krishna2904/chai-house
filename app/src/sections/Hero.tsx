import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, MapPin } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="The Chai House interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-masala-brown/70 via-masala-brown/50 to-masala-brown/80" />
      </div>

      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="floating absolute top-24 left-[8%] w-10 h-10 text-white/15"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ animationDelay: '0s' }}
        >
          <ellipse cx="12" cy="12" rx="4" ry="7" />
          <ellipse cx="12" cy="12" rx="7" ry="4" />
        </svg>
        <svg
          className="floating absolute top-40 right-[12%] w-14 h-14 text-white/10"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ animationDelay: '1.5s' }}
        >
          <rect x="4" y="10" width="16" height="4" rx="2" />
        </svg>
        <svg
          className="floating absolute bottom-48 left-[15%] w-12 h-12 text-white/10"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ animationDelay: '3s' }}
        >
          <path d="M12 2L14 9H21L15 14L17 21L12 17L7 21L9 14L3 9H10L12 2Z" />
        </svg>
      </div>

      {/* Steam Animation */}
      <div className="steam-container bottom-[18%]">
        <div className="steam steam-1" />
        <div className="steam steam-2" />
        <div className="steam steam-3" />
        <div className="steam steam-4" />
        <div className="steam steam-5" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
        {/* Location Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <MapPin className="w-4 h-4 text-saffron-light" />
          <span className="text-white/90 text-sm">Indore</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-none">
          <span
            className={`inline-block transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            DELICIOUS
          </span>
        </h1>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-none">
          <span
            className={`inline-block text-saffron transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            ORGANIC CHAI
          </span>
        </h1>

        {/* Subtext */}
        <p
          className={`text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-10 transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Handcrafted masala chai, brewed from generations-old spice blends.
          Find your perfect cup.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link to="/menu">
            <Button
              size="lg"
              className="bg-saffron hover:bg-saffron/90 text-white px-8 py-6 rounded-full text-lg font-medium shimmer-btn shadow-warm"
            >
              Explore Menu
            </Button>
          </Link>
          <a href="#about">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-medium bg-transparent"
            >
              Our Story
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <a href="#about" className="animate-bounce-slow text-white/60 hover:text-white">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
}
