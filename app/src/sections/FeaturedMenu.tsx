import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { featuredItems } from '@/data/menuData';

export default function FeaturedMenu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-cream-parchment">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-masala-brown">
            FEATURED <span className="text-saffron">MENU ITEMS</span>
          </h2>
        </div>

        {/* Menu Items List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative bg-white rounded-2xl p-4 sm:p-6 transition-all duration-500 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                hoveredItem === item.id
                  ? 'shadow-warm-lg scale-[1.02]'
                  : 'shadow-warm hover:shadow-warm-lg'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover rounded-xl transition-all duration-500 ${
                      hoveredItem === item.id ? 'scale-110 rotate-3' : ''
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-saffron text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg sm:text-xl text-masala-brown truncate">
                    {item.name}
                  </h3>
                  <p className="text-dark-chai/60 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex-shrink-0">
                  <span className="font-serif text-xl sm:text-2xl text-saffron font-bold">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Link */}
        <div
          className={`text-center mt-10 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-saffron font-medium hover:gap-3 transition-all"
          >
            View Full Menu
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
