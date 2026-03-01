import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuItems, brewFilters } from '@/data/menuData';
import type { MenuItem } from '@/data/menuData';

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

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

  const filteredItems = menuItems.filter((item) => {
    if (!item.brewType) return false;
    if (activeFilter === 'all') return true;
    return item.brewType === activeFilter;
  });

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
            Our Menu
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-masala-brown">
            Our <span className="text-saffron">Signature</span> Brews
          </h2>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {brewFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-saffron text-white'
                  : 'bg-white text-dark-chai shadow-sm hover:bg-saffron/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Menu Grid - 3 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              isVisible={isVisible}
              delay={index * 100 + 200}
            />
          ))}
        </div>

        {/* View Full Menu Link */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-saffron font-medium hover:gap-3 transition-all"
          >
            View Full Menu
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function MenuCard({
  item,
  isVisible,
  delay,
}: {
  item: MenuItem;
  isVisible: boolean;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const brewTypeLabel =
    item.brewType?.charAt(0).toUpperCase() + (item.brewType?.slice(1) ?? '');

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } hover:shadow-warm-lg`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${
              item.badge === 'Bestseller'
                ? 'bg-red-500 text-white'
                : item.badge === 'Sale!'
                  ? 'bg-saffron/90 text-white'
                  : 'bg-saffron text-white'
            }`}
          >
            {item.badge}
          </span>
        )}
        {/* Add to Order overlay */}
        <div
          className={`absolute inset-0 bg-saffron/80 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link
            to="/menu"
            className="px-6 py-3 bg-white text-dark-chai font-medium rounded-full hover:bg-cream-parchment transition-colors"
          >
            Add to Order
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-semibold text-masala-brown truncate">
              {item.name}
            </h3>
            <p className="text-dark-chai/60 text-sm mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
          <span className="font-serif text-xl font-bold text-masala-brown flex-shrink-0">
            ₹{item.price}
          </span>
        </div>
        {item.brewType && (
          <p className="text-dark-chai/40 text-xs mt-2 text-right">
            {brewTypeLabel}
          </p>
        )}
      </div>
    </div>
  );
}
