export type BrewType = 'classic' | 'premium' | 'cold' | 'seasonal';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'chai' | 'non-chai' | 'food' | 'snack' | 'dessert';
  badge?: string;
  brewType?: BrewType;
}

export const menuItems: MenuItem[] = [
  // Chai Items
  {
    id: 1,
    name: 'Dilli Masala Chai',
    description: 'Classic spiced black tea with ginger & cardamom',
    price: 80,
    image: '/images/menu-masala-chai.jpg',
    category: 'chai',
    badge: 'Bestseller',
    brewType: 'classic',
  },
  {
    id: 2,
    name: 'Kashmiri Kahwa',
    description: 'Saffron-infused green tea with almonds & cinnamon',
    price: 150,
    image: '/images/menu-kahwa.jpg',
    category: 'chai',
    brewType: 'premium',
  },
  {
    id: 3,
    name: 'Rose Cardamom Chai',
    description: 'Floral black tea with rose petals & cardamom pods',
    price: 120,
    image: '/images/menu-rose-cardamom.jpg',
    category: 'chai',
    badge: 'Sale!',
    brewType: 'premium',
  },
  {
    id: 4,
    name: 'Adrak Tulsi Special',
    description: 'Bold ginger & holy basil immunity brew',
    price: 90,
    image: '/images/menu-adrak-tulsi.jpg',
    category: 'chai',
    brewType: 'classic',
  },
  {
    id: 5,
    name: 'Saffron Golden Milk',
    description: 'Turmeric latte with saffron & black pepper',
    price: 160,
    image: '/images/menu-golden-milk.jpg',
    category: 'chai',
    brewType: 'premium',
  },
  {
    id: 6,
    name: 'Cold Brew Chai',
    description: 'Overnight cold-steeped masala chai served over ice',
    price: 130,
    image: '/images/menu-cold-brew.jpg',
    category: 'chai',
    badge: 'Seasonal',
    brewType: 'seasonal',
  },
  // Non-Chai Items
  {
    id: 7,
    name: 'Filter Coffee',
    description: 'South Indian style filter coffee with frothy milk',
    price: 70,
    image: '/images/menu-masala-chai.jpg',
    category: 'non-chai',
    brewType: 'classic',
  },
  {
    id: 8,
    name: 'Hot Chocolate',
    description: 'Rich creamy hot chocolate with whipped cream',
    price: 120,
    image: '/images/menu-golden-milk.jpg',
    category: 'non-chai',
    brewType: 'premium',
  },
  {
    id: 9,
    name: 'Lemon Ginger Tea',
    description: 'Refreshing lemon tea with fresh ginger',
    price: 60,
    image: '/images/menu-adrak-tulsi.jpg',
    category: 'non-chai',
    brewType: 'cold',
  },
  {
    id: 10,
    name: 'Green Tea',
    description: 'Premium Japanese green tea',
    price: 80,
    image: '/images/menu-kahwa.jpg',
    category: 'non-chai',
    brewType: 'premium',
  },
  // Food Items
  {
    id: 11,
    name: 'Samosa Platter',
    description: 'Crispy samosas with mint & tamarind chutney',
    price: 120,
    image: '/images/gallery-5.jpg',
    category: 'food',
  },
  {
    id: 12,
    name: 'Vada Pav',
    description: 'Mumbai style potato fritter in bun',
    price: 80,
    image: '/images/gallery-5.jpg',
    category: 'food',
  },
  {
    id: 13,
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with spices',
    price: 200,
    image: '/images/gallery-5.jpg',
    category: 'food',
  },
  // Snack Items
  {
    id: 14,
    name: 'Masala Peanuts',
    description: 'Spicy roasted peanuts',
    price: 50,
    image: '/images/gallery-2.jpg',
    category: 'snack',
  },
  {
    id: 15,
    name: 'Bhel Puri',
    description: 'Crispy puffed rice with chutneys',
    price: 70,
    image: '/images/gallery-2.jpg',
    category: 'snack',
  },
  // Dessert Items
  {
    id: 16,
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings in sugar syrup',
    price: 100,
    image: '/images/menu-rose-cardamom.jpg',
    category: 'dessert',
  },
  {
    id: 17,
    name: 'Rasmalai',
    description: 'Cottage cheese patties in saffron milk',
    price: 120,
    image: '/images/menu-kahwa.jpg',
    category: 'dessert',
  },
];

export const categories = [
  { id: 'chai', label: 'Chai' },
  { id: 'non-chai', label: 'Non Chai' },
  { id: 'food', label: 'Food' },
  { id: 'snack', label: 'Snack' },
  { id: 'dessert', label: 'Dessert' },
];

export const brewFilters = [
  { id: 'all', label: 'All' },
  { id: 'classic', label: 'Classic' },
  { id: 'premium', label: 'Premium' },
  { id: 'cold', label: 'Cold' },
  { id: 'seasonal', label: 'Seasonal' },
] as const;

export const featuredItems = menuItems.slice(0, 4);

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sneha K.',
    avatar: 'S',
    rating: 5,
    text: 'Finally a chai place that takes spices seriously. The Rose Cardamom blend is unreal.',
    location: 'Bangalore',
  },
  {
    id: 2,
    name: 'Rahul T.',
    avatar: 'R',
    rating: 5,
    text: 'Ordered the gift box for my mom – she called me crying happy tears. Worth every rupee.',
    location: 'Pune',
  },
  {
    id: 3,
    name: 'Priya S.',
    avatar: 'P',
    rating: 5,
    text: 'The masala chai here tastes exactly like my nani used to make. Pure nostalgia in a cup.',
    location: 'Mumbai',
  },
  {
    id: 4,
    name: 'Arjun M.',
    avatar: 'A',
    rating: 5,
    text: 'Kashmiri Kahwa completely changed my morning routine. I order the tin every month now.',
    location: 'Delhi',
  },
  {
    id: 5,
    name: 'Meera P.',
    avatar: 'M',
    rating: 5,
    text: 'The Adrak Tulsi is my go-to when I need a wellness boost. So aromatic and comforting.',
    location: 'Chennai',
  },
];

export const galleryImages = [
  { id: 1, src: '/images/gallery-1.jpg', alt: 'Chai latte art', category: 'Cozy' },
  { id: 2, src: '/images/gallery-2.jpg', alt: 'Spice arrangement', category: 'Vegan-friendly' },
  { id: 3, src: '/images/gallery-3.jpg', alt: 'Chai preparation', category: 'Craft Chai' },
  { id: 4, src: '/images/gallery-4.jpg', alt: 'Friends enjoying chai', category: 'Cozy' },
  { id: 5, src: '/images/gallery-5.jpg', alt: 'Chai and snacks', category: 'Vegan-friendly' },
  { id: 6, src: '/images/gallery-6.jpg', alt: 'Chai toast', category: 'Cozy' },
];
