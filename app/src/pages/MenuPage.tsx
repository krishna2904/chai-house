import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Coffee,
  ShoppingBag,
  History,
  Users,
  Settings,
  Heart,
  LogOut,
  Search,
  SlidersHorizontal,
  Minus,
  Plus,
  X,
  ShoppingCart,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { menuItems, categories } from '@/data/menuData';

const sidebarItems = [
  { icon: Home, label: 'Home page', href: '/' },
  { icon: Coffee, label: 'Menu', href: '/menu', active: true },
  { icon: ShoppingBag, label: 'My orders', href: '#', badge: 10 },
  { icon: History, label: 'History', href: '#' },
  { icon: Users, label: 'Partners', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
  { icon: Heart, label: 'Donate to shelter', href: '#' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('chai');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, 'Small' | 'Large'>>({});
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const filteredItems = menuItems.filter(
    (item) =>
      item.category === activeCategory &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSizeChange = (itemId: number, size: 'Small' | 'Large') => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    const size = selectedSizes[item.id] || 'Small';
    const price = size === 'Small' ? item.price : Math.round(item.price * 1.3);
    const itemKey = `${item.id}-${size}`;

    addToCart({
      id: item.id,
      name: item.name,
      price,
      image: item.image,
      size,
      category: item.category,
    });

    setAddedItems((prev) => new Set(prev).add(itemKey));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(itemKey);
        return next;
      });
    }, 2000);
  };

  const getItemQuantity = (itemId: number, size: string) => {
    const cartItem = cartItems.find((i) => i.id === itemId && i.size === size);
    return cartItem?.quantity || 0;
  };

  const totalPrice = getTotalPrice();
  const discount = totalPrice > 500 ? 50 : 0;
  const finalTotal = totalPrice - discount;

  return (
    <div className="min-h-screen bg-cream-parchment">
      <Navbar onMenuClick={() => setCartOpen(true)} showCart />

      <div className="pt-20 lg:pt-24 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 bg-white border-r border-saffron/10 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  item.active
                    ? 'bg-saffron/10 text-saffron'
                    : 'text-dark-chai/70 hover:bg-saffron/5 hover:text-saffron'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-saffron text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-saffron/10">
            <button className="flex items-center gap-3 px-4 py-3 text-dark-chai/70 hover:text-saffron transition-colors w-full">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-chai/40" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white border-0 rounded-xl"
                />
              </div>
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl border-saffron/20 text-saffron hover:bg-saffron/10"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-saffron text-white'
                      : 'bg-white text-dark-chai hover:bg-saffron/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Section Title */}
            <h2 className="font-serif text-2xl text-masala-brown mb-6 capitalize">
              {activeCategory.replace('-', ' ')} Menu
            </h2>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => {
                const size = selectedSizes[item.id] || 'Small';
                const price = size === 'Small' ? item.price : Math.round(item.price * 1.3);
                const quantity = getItemQuantity(item.id, size);
                const itemKey = `${item.id}-${size}`;
                const isAdded = addedItems.has(itemKey);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 transition-all hover:shadow-warm"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-dark-chai truncate">
                              {item.name}
                            </h3>
                            <p className="text-saffron font-semibold">₹{price}</p>
                          </div>
                        </div>

                        <p className="text-dark-chai/50 text-xs mt-1 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Size Selection */}
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-xs text-dark-chai/50">Size</span>
                          <div className="flex gap-1">
                            {(['Small', 'Large'] as const).map((s) => (
                              <button
                                key={s}
                                onClick={() => handleSizeChange(item.id, s)}
                                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                  size === s
                                    ? 'bg-saffron text-white'
                                    : 'bg-saffron/10 text-dark-chai hover:bg-saffron/20'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex items-center justify-between mt-4">
                          {quantity > 0 ? (
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, size, quantity - 1)
                                }
                                className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center text-saffron hover:bg-saffron/20"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium w-4 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, size, quantity + 1)
                                }
                                className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center text-saffron hover:bg-saffron/20"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                                isAdded
                                  ? 'bg-green-500 text-white'
                                  : 'bg-saffron/10 text-saffron hover:bg-saffron hover:text-white'
                              }`}
                            >
                              {isAdded ? (
                                <span className="flex items-center justify-center gap-1">
                                  <Check className="w-4 h-4" /> Added
                                </span>
                              ) : (
                                'Add to Cart'
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Cart Sidebar */}
        <aside
          className={`fixed right-0 top-20 bottom-0 w-full sm:w-96 bg-white shadow-2xl transition-transform duration-300 z-40 ${
            cartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-saffron/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-saffron" />
                <h3 className="font-serif text-xl text-masala-brown">Cart</h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-saffron/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-dark-chai" />
              </button>
            </div>

            {/* Order Type */}
            <div className="p-4 border-b border-saffron/10">
              <div className="flex gap-2">
                {['Delivery', 'Dine in', 'Take away'].map((type) => (
                  <button
                    key={type}
                    className={`flex-1 py-2 text-xs rounded-full transition-colors ${
                      type === 'Delivery'
                        ? 'bg-saffron text-white'
                        : 'bg-saffron/10 text-dark-chai hover:bg-saffron/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-saffron/20 mx-auto mb-4" />
                  <p className="text-dark-chai/50">Your cart is empty</p>
                  <p className="text-sm text-dark-chai/40 mt-1">
                    Add items to get started
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3 bg-saffron/5 rounded-xl p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-dark-chai text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-dark-chai/50">
                        {item.size} • 200g
                      </p>
                      <p className="text-saffron font-semibold text-sm mt-1">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="p-1 hover:bg-saffron/20 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-dark-chai/40" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full bg-saffron/20 flex items-center justify-center text-saffron"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full bg-saffron/20 flex items-center justify-center text-saffron"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-saffron/10 bg-cream-parchment">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-chai/60">Items</span>
                    <span className="font-medium">₹{totalPrice}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-chai/60">Discount</span>
                      <span className="font-medium text-green-600">
                        -₹{discount}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-saffron/10">
                    <span>Total</span>
                    <span className="text-saffron">₹{finalTotal}</span>
                  </div>
                </div>
                <Button className="w-full bg-saffron hover:bg-saffron/90 text-white rounded-full py-6">
                  Place an order
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Overlay */}
        {cartOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={() => setCartOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
