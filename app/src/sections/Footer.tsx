import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [footerEmail, setFooterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle subscribe
      setEmail('');
    }
  };

  const handleFooterNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail) {
      // Handle join
      setFooterEmail('');
    }
  };

  return (
    <>
      {/* Newsletter CTA Section */}
      <section className="bg-saffron relative overflow-hidden">
        {/* Decorative stars */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-[10%] w-2 h-2 bg-white rounded-full" />
          <div className="absolute top-20 right-[15%] w-1.5 h-1.5 bg-white rounded-full" />
          <div className="absolute bottom-16 left-[20%] w-1 h-1 bg-white rounded-full" />
          <div className="absolute bottom-24 right-[25%] w-2 h-2 bg-white rounded-full" />
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4">
              Get ₹50 Off Your First Order
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8">
              Join 10,000+ chai lovers. No spam, only spice.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-white text-dark-chai placeholder:text-dark-chai/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-masala-brown text-white font-medium hover:bg-masala-brown/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="text-white/60 text-xs mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-masala-brown text-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Column 1: Brand */}
              <div>
                <Link to="/" className="inline-flex items-center gap-3 mb-4">
                  <div className="p-3 bg-saffron rounded-full">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-serif text-2xl font-bold">The Chai House</span>
                </Link>
                <p className="text-white/60 text-sm mb-6">
                  Brewing stories, one cup at a time.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-saffron hover:bg-saffron transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-saffron hover:bg-saffron transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-saffron hover:bg-saffron transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-saffron hover:bg-saffron transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-3 text-white/60 text-sm">
                  <li>
                    <Link to="/" className="hover:text-saffron transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/menu" className="hover:text-saffron transition-colors">
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link to="/#about" className="hover:text-saffron transition-colors">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link to="/#careers" className="hover:text-saffron transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/#press" className="hover:text-saffron transition-colors">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Support */}
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-3 text-white/60 text-sm">
                  <li>
                    <Link to="/#contact" className="hover:text-saffron transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/#faqs" className="hover:text-saffron transition-colors">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/#shipping" className="hover:text-saffron transition-colors">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link to="/#returns" className="hover:text-saffron transition-colors">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link to="/#gift-cards" className="hover:text-saffron transition-colors">
                      Gift Cards
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Stay in the Loop */}
              <div>
                <h4 className="font-semibold text-white mb-4">Stay in the Loop</h4>
                <p className="text-white/60 text-sm mb-4">
                  Get updates on new blends and exclusive offers.
                </p>
                <form
                  onSubmit={handleFooterNewsletterSubmit}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    placeholder="Your email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-saffron text-sm"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-saffron text-white font-medium hover:bg-saffron/90 transition-colors text-sm whitespace-nowrap"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-sm">
              <p>© 2026 The Chai House. All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/privacy" className="hover:text-saffron transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-saffron transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
