import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { galleryImages } from '@/data/menuData';

const categories = ['All', 'Vegan-friendly', 'Cozy', 'Craft Chai'];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

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

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 lg:py-32 bg-cream-parchment">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <p className="text-saffron font-medium text-sm uppercase tracking-wider mb-1">
              Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-masala-brown">
              Our <span className="text-saffron">Photos</span>
            </h2>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-saffron font-medium hover:gap-3 transition-all"
          >
            View More Photos
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-saffron text-white shadow-md'
                  : 'bg-white text-dark-chai hover:bg-saffron/10 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento-style Photo Grid - 2 large top, 4 small bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(160px,1fr)]">
          {filteredImages.map((image, index) => {
            const isWide = index < 2;
            return (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-2xl ${
                  isWide ? 'md:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl h-full min-h-[180px] md:min-h-[200px] transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 80 + 200}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-saffron/0 group-hover:bg-saffron/60 flex items-center justify-center transition-all duration-300">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg"
                    >
                      <Instagram className="w-6 h-6 text-saffron" />
                    </a>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
