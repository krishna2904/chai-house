import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const transitionClass = () =>
    `transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-cream-parchment">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-12 ${transitionClass()}`}
            style={{ transitionDelay: '0ms' }}
          >
            <p className="text-saffron font-medium text-sm uppercase tracking-wider mb-1">
              Our Process
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-masala-brown">
              Freshly Brewed <span className="text-saffron">Goodness</span>
            </h2>
          </div>

          {/* Bento Grid: Chef (1 col, 2 rows) | Video (2 cols) + CTA & Stats (1 col each) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
            {/* Chef - left column, full height */}
            <div
              className={`lg:row-span-2 rounded-2xl overflow-hidden ${transitionClass()}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="relative h-full min-h-[280px] lg:min-h-[340px]">
                <img
                  src="/images/chef.jpg"
                  alt="Our Master Chaiwala"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-masala-brown/90 to-transparent">
                  <h3 className="font-serif text-xl text-white font-bold">
                    Rajesh Kumar
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    The hands behind every brew
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-saffron-light font-medium mt-3 hover:gap-3 transition-all text-sm"
                  >
                    Read More
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Video Card - top right, spans 2 cols */}
            <div
              className={`lg:col-span-2 rounded-2xl overflow-hidden relative group ${transitionClass()}`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="relative aspect-video lg:aspect-[2/1] bg-turmeric-gold/20">
                <img
                  src="/images/process.jpg"
                  alt="Our Process"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <button className="w-14 h-14 lg:w-16 lg:h-16 bg-saffron rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 lg:p-4">
                    <p className="font-serif text-base lg:text-lg text-masala-brown font-semibold">
                      Freshly Made
                    </p>
                    <p className="text-dark-chai/60 text-xs lg:text-sm">
                      Made daily for pure, honest flavor
                    </p>
                    <span className="inline-block mt-2 bg-saffron/10 text-saffron text-xs px-3 py-1 rounded-full">
                      #Artisan Chai
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card - below video */}
            <div
              className={`rounded-2xl bg-saffron/10 p-6 flex flex-col justify-center ${transitionClass()}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-saffron rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">☕</span>
                </div>
                <span className="text-dark-chai/70 text-sm font-medium">
                  Small Batches
                </span>
              </div>
              <p className="text-masala-brown font-serif text-lg lg:text-xl mb-4">
                Crafted with care for every sip
              </p>
              <Link to="/menu">
                <Button className="bg-saffron hover:bg-saffron/90 text-white rounded-full px-6 w-full sm:w-auto">
                  Order Fresh
                </Button>
              </Link>
            </div>

            {/* Stats Card - below video */}
            <div
              className={`rounded-2xl bg-white shadow-warm p-6 flex flex-col justify-center border border-saffron/5 ${transitionClass()}`}
              style={{ transitionDelay: '250ms' }}
            >
              <p className="text-dark-chai/60 text-sm leading-relaxed">
                Made in small batches to keep every sip fresh and comforting. No shortcuts, just tradition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
