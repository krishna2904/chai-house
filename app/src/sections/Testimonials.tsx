import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/menuData';

const SLIDES_COUNT = 5;

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES_COUNT);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES_COUNT) % SLIDES_COUNT);
  };

  const visibleTestimonials = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-cream-parchment">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-saffron font-medium text-sm uppercase tracking-wider mb-1">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-masala-brown">
            Chai Lovers <span className="text-saffron">Speak</span>
          </h2>
        </div>

        {/* Testimonials Grid - 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${currentIndex}-${index}`}
              className={`bg-white rounded-2xl p-6 sm:p-8 shadow-md transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Quote icon - top left */}
              <Quote className="w-12 h-12 sm:w-14 sm:h-14 text-saffron/30 mb-4" strokeWidth={1} />

              {/* Testimonial text */}
              <p className="text-dark-chai/80 text-base leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Footer: avatar, name, location | stars */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-saffron/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-saffron text-lg font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-dark-chai">{testimonial.name}</p>
                    <p className="text-sm text-dark-chai/60">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-turmeric-gold text-turmeric-gold"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation - arrows + pagination dots */}
        <div
          className={`flex justify-center items-center gap-4 mt-10 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-dark-chai hover:bg-saffron hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {[...Array(SLIDES_COUNT)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-saffron' : 'bg-dark-chai/20'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-dark-chai hover:bg-saffron hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
