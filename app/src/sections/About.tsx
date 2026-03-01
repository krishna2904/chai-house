import { useEffect, useRef, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

const openingHours = [
  { day: 'Monday - Thursday', time: '7:00 AM - 10:00 PM' },
  { day: 'Friday - Saturday', time: '7:00 AM - 11:00 PM' },
  { day: 'Sunday', time: '7:30 AM - 10:00 PM' },
];

export default function About() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-cream-parchment"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-masala-brown mb-6">
            ABOUT <span className="text-saffron">THE CHAI HOUSE</span>
          </h2>
          <p className="text-dark-chai/70 text-lg max-w-2xl mx-auto leading-relaxed">
            The Chai House offers an authentic Indian chai experience in the heart of Delhi. 
            Our traditional recipes, crafted by master chaiwalas, combine classic spices 
            with modern brewing techniques.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Map Card */}
          <div
            className={`bg-warm-beige rounded-3xl overflow-hidden transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative h-80 lg:h-full min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.206590238728!2d75.8299686!3d22.646084799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fb0075eb8a61%3A0xfd34d578a843dd18!2sThe%20chai%20house%20silicon%20city!5e0!3m2!1sen!2sjp!4v1772367739534!5m2!1sen!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
                title="The Chai House Location"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-saffron rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-chai">silicon city</p>
                    <p className="text-sm text-dark-chai/60">Indore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours Card */}
          <div
            className={`bg-warm-beige rounded-3xl p-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-serif text-2xl text-masala-brown">
                OPENING HOURS
              </h3>
            </div>

            <div className="space-y-4">
              {openingHours.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-masala-brown/10 last:border-0"
                >
                  <span className="text-dark-chai font-medium">{item.day}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-saffron" />
                    <span className="text-dark-chai/70">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-saffron/10 rounded-xl">
              <p className="text-saffron text-sm font-medium text-center">
                We are open now! Come visit us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
