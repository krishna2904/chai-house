import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onMenuClick?: () => void;
  showCart?: boolean;
}

export default function Navbar({ onMenuClick, showCart = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const navBg = isScrolled
    ? 'bg-cream-parchment/95 backdrop-blur-xl shadow-md'
    : isHome
    ? 'bg-transparent'
    : 'bg-cream-parchment';

  const textColor = isScrolled || !isHome ? 'text-dark-chai' : 'text-white';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/images/logo.jpg"
              alt="The Chai House"
              className="h-10 lg:h-12 w-auto object-contain rounded-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium hover:text-saffron transition-colors relative group ${textColor}`}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/menu"
              className={`text-sm font-medium hover:text-saffron transition-colors relative group ${textColor}`}
            >
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full" />
            </Link>
            <a
              href="/#about"
              className={`text-sm font-medium hover:text-saffron transition-colors relative group ${textColor}`}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="/#gallery"
              className={`text-sm font-medium hover:text-saffron transition-colors relative group ${textColor}`}
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart Button (for menu page) */}
            {showCart && (
              <button
                onClick={onMenuClick}
                className="relative p-2 rounded-full bg-saffron/10 hover:bg-saffron/20 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-saffron" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-saffron text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Order Button */}
            <Link to="/menu">
              <Button
                className={`hidden sm:flex rounded-full px-6 ${
                  isScrolled || !isHome
                    ? 'bg-saffron hover:bg-saffron/90 text-white'
                    : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white'
                }`}
              >
                Order Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${textColor}`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-cream-parchment shadow-lg transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-dark-chai font-medium py-2 border-b border-saffron/10"
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-dark-chai font-medium py-2 border-b border-saffron/10"
          >
            Menu
          </Link>
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-dark-chai font-medium py-2 border-b border-saffron/10"
          >
            About
          </a>
          <a
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-dark-chai font-medium py-2 border-b border-saffron/10"
          >
            Gallery
          </a>
          <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full bg-saffron hover:bg-saffron/90 text-white rounded-full mt-4">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
